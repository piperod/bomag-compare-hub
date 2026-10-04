# Real-ESRGAN x4plus upscaler for low-resolution datasheet photos (CPU).
# Needs: pip install torch pillow numpy; weights RealESRGAN_x4plus.pth from
# https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth
# Usage: python3 scripts/upscale_machine_photo.py <in> <out.png> [<in> <out.png> ...]
# then: node scripts/prepare_machine_photo.cjs <out.png> <final.jpg>
import os, sys, time, torch, torch.nn as nn, torch.nn.functional as F, numpy as np
from PIL import Image, ImageFilter
class RDB(nn.Module):
    def __init__(s, nf=64, gc=32):
        super().__init__()
        s.conv1=nn.Conv2d(nf,gc,3,1,1); s.conv2=nn.Conv2d(nf+gc,gc,3,1,1); s.conv3=nn.Conv2d(nf+2*gc,gc,3,1,1)
        s.conv4=nn.Conv2d(nf+3*gc,gc,3,1,1); s.conv5=nn.Conv2d(nf+4*gc,nf,3,1,1); s.l=nn.LeakyReLU(0.2,True)
    def forward(s,x):
        x1=s.l(s.conv1(x)); x2=s.l(s.conv2(torch.cat((x,x1),1))); x3=s.l(s.conv3(torch.cat((x,x1,x2),1)))
        x4=s.l(s.conv4(torch.cat((x,x1,x2,x3),1))); x5=s.conv5(torch.cat((x,x1,x2,x3,x4),1)); return x5*0.2+x
class RRDB(nn.Module):
    def __init__(s,nf=64,gc=32):
        super().__init__(); s.rdb1=RDB(nf,gc); s.rdb2=RDB(nf,gc); s.rdb3=RDB(nf,gc)
    def forward(s,x): return s.rdb3(s.rdb2(s.rdb1(x)))*0.2+x
class RRDBNet(nn.Module):
    def __init__(s,nb=23,nf=64):
        super().__init__()
        s.conv_first=nn.Conv2d(3,nf,3,1,1); s.body=nn.Sequential(*[RRDB(nf) for _ in range(nb)]); s.conv_body=nn.Conv2d(nf,nf,3,1,1)
        s.conv_up1=nn.Conv2d(nf,nf,3,1,1); s.conv_up2=nn.Conv2d(nf,nf,3,1,1); s.conv_hr=nn.Conv2d(nf,nf,3,1,1); s.conv_last=nn.Conv2d(nf,3,3,1,1); s.l=nn.LeakyReLU(0.2,True)
    def forward(s,x):
        f=s.conv_first(x); f=f+s.conv_body(s.body(f))
        f=s.l(s.conv_up1(F.interpolate(f,scale_factor=2,mode='nearest'))); f=s.l(s.conv_up2(F.interpolate(f,scale_factor=2,mode='nearest')))
        return s.conv_last(s.l(s.conv_hr(f)))
m=RRDBNet(); sd=torch.load(os.environ.get('ESRGAN_WEIGHTS', 'RealESRGAN_x4plus.pth'),map_location='cpu'); m.load_state_dict(sd.get('params_ema',sd)); m.eval()
torch.set_num_threads(max(1, torch.get_num_threads()))
def run(src,dst):
    im=Image.open(src).convert('RGB'); w,h=im.size
    pre = 1.0
    if max(w,h)>700: pre=700/max(w,h); im=im.resize((round(w*pre),round(h*pre)),Image.LANCZOS)  # x4 of 700 is already >2600
    x=torch.from_numpy(np.asarray(im).astype(np.float32)/255).permute(2,0,1)[None]
    T,P=200,10; _,_,H,W=x.shape; out=torch.zeros(1,3,H*4,W*4)
    t=time.time()
    with torch.no_grad():
        for y0 in range(0,H,T):
            for x0 in range(0,W,T):
                ya,xa=max(y0-P,0),max(x0-P,0); yb,xb=min(y0+T+P,H),min(x0+T+P,W)
                o=m(x[:,:,ya:yb,xa:xb])
                y1,x1=min(y0+T,H),min(x0+T,W)
                out[:,:,y0*4:y1*4,x0*4:x1*4]=o[:,:,(y0-ya)*4:(y0-ya)*4+(y1-y0)*4,(x0-xa)*4:(x0-xa)*4+(x1-x0)*4]
    r=Image.fromarray((out[0].clamp(0,1).permute(1,2,0).numpy()*255).round().astype(np.uint8))
    r.thumbnail((1600,1200),Image.LANCZOS); r.save(dst)
    print(src,(w,h),'->',r.size,f'{time.time()-t:.0f}s',flush=True)
for a,b in zip(sys.argv[1::2],sys.argv[2::2]): run(a,b)
