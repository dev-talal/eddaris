import { QRLayer, whiteLogo, playstorebutton, iostorebutton } from '../../Widgets/AllImages'
const QrNotFound = () => {
  return (
    <div>
        <header className="qr-header">
            <img src={whiteLogo} alt="Thankou Qr" />
        </header>
        <div className="qr-scan-wrapper">
            <img src={QRLayer} className="qr-layer" alt="Qr Image" />
            <div>
                <h5>This Code Has Not Been Claimed</h5>
                <p className="px-4 mb-0">
                    Would you like to add media to this QR Code? 
                    Download the App and claim your QR code.
                </p>
                <ul className="list-inline mt-4">
                    <li className="list-inline-item me-3">
                        <a href="https://play.google.com/store/apps/details?id=com.rn.app.thankyoullc" target="_blank">
                            <img src={playstorebutton} alt="Play store" />
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://apps.apple.com/us/app/thank-you-llc/id1585503166" target="_blank">
                            <img src={iostorebutton} alt="Play store" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <style>{`
            body{
                background:#fff !important;
            }
        `}</style>
    </div>
  )

}
export default QrNotFound 