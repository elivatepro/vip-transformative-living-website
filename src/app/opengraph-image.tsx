import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'VIP Transformative Living - Coach Wayne Dawson';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  // We can load the font here if needed, but for now we'll use system fonts
  
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Background Gradient/Noise simulation */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
           {/* Logo Representation */}
           <div style={{ fontSize: '80px', fontWeight: 'bold', color: '#D4AF37', letterSpacing: '-0.05em' }}>VIP</div>
        </div>
        
        <div style={{ fontSize: '40px', color: '#D4AF37', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '40px' }}>
          Transformative Living
        </div>

        <div style={{ fontSize: '24px', color: '#E5E5E5', maxWidth: '800px', textAlign: 'center', lineHeight: '1.4' }}>
          For driven men navigating life's pivotal crossroads.<br/>
          Align your Values, Identity, and Purpose.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
