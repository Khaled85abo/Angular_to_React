import { useState, useEffect } from "react"
import { SinglePhone } from "../../types/phone"
import { checkmark as utilityCheckmark } from "../../utilities/checkmark"
import { useParams } from "react-router-dom";
const PhoneDetail = () => {
    const { phoneId } = useParams();

    const [phone, setPhone] = useState<SinglePhone | null>(null)
    const [mainImageUrl, setMainImageUrl] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const handleSetImage = (img: string) => {
        console.log('handleSetImage', img);

        setMainImageUrl(img)
    }

    const handleFetchPhoneInfo = async () => {
        try {
            const response = await fetch(`/phones/${phoneId}.json`)
            const phone = await response.json()
            setPhone(phone)
            setMainImageUrl(phone.images[0])
        } catch (e: any) {
            setError(e.message || "Something went wrong")
            console.log(e)
        }
        return null
    }
    useEffect(() => {
        handleFetchPhoneInfo()
    }, [phoneId])
    if (!phone || !mainImageUrl) return null

    if (error) return (
        <div className="alert alert-danger" role="alert">
            {error}
        </div>
    )
    return (
        <>
            <div className="phone-images">
                <img src={mainImageUrl} alt="elegant design" className="phone" />
                {/* {phone.images.map(img => (
                    <img key={img} src={img} className={img === mainImageUrl ? "selected phone" : "phone"} />
                ))} */}
                {/* <img ng-src="{{img}}" className="phone"
                    ng-className="{selected: img === $ctrl.mainImageUrl}"
                    ng-repeat="img in $ctrl.phone.images" /> */}
            </div>

            <h1>{phone.name}</h1>

            <p>{phone.description}</p>

            <ul className="phone-thumbs">
                {phone.images.map((img, index) => (
                    <li key={index}>
                        <img src={img} alt="elegant design" onClick={() => handleSetImage(img)} />
                    </li>
                ))}
            </ul>

            <ul className="specs">
                <li>
                    <span>Availability and Networks</span>
                    <dl>
                        <dt>Availability</dt>
                        {phone.availability.map((availability) => (
                            <dd key={availability}>{availability}</dd>
                        ))}
                    </dl>
                </li>
                <li>
                    <span>Battery</span>
                    <dl>
                        <dt>Type</dt>
                        <dd>{phone.battery.type}</dd>
                        <dt>Talk Time</dt>
                        <dd>{phone.battery.talkTime}</dd>
                        <dt>Standby time (max)</dt>
                        <dd>{phone.battery.standbyTime}</dd>
                    </dl>
                </li>
                <li>
                    <span>Storage and Memory</span>
                    <dl>
                        <dt>RAM</dt>
                        <dd>{phone.storage.ram}</dd>
                        <dt>Internal Storage</dt>
                        <dd>{phone.storage.flash}</dd>
                    </dl>
                </li>
                <li>
                    <span>Connectivity</span>
                    <dl>
                        <dt>Network Support</dt>
                        <dd>{phone.connectivity.cell}</dd>
                        <dt>WiFi</dt>
                        <dd>{phone.connectivity.wifi}</dd>
                        <dt>Bluetooth</dt>
                        <dd>{phone.connectivity.bluetooth}</dd>
                        <dt>Infrared</dt>
                        <dd>{utilityCheckmark(phone.connectivity.infrared)}</dd>
                        <dt>GPS</dt>
                        <dd>{utilityCheckmark(phone.connectivity.gps)}</dd>
                    </dl>
                </li>
                <li>
                    <span>Android</span>
                    <dl>
                        <dt>OS Version</dt>
                        <dd>{phone.android.os}</dd>
                        <dt>UI</dt>
                        <dd>{phone.android.ui}</dd>
                    </dl>
                </li>
                <li>
                    <span>Size and Weight</span>
                    <dl>
                        <dt>Dimensions</dt>
                        {phone.sizeAndWeight.dimensions.map(dim => (
                            <dd key={dim}>{dim}</dd>
                        ))}
                        <dt>Weight</dt>
                        <dd>{phone.sizeAndWeight.weight}</dd>
                    </dl>
                </li>
                <li>
                    <span>Display</span>
                    <dl>
                        <dt>Screen size</dt>
                        <dd>{phone.display.screenSize}</dd>
                        <dt>Screen resolution</dt>
                        <dd>{phone.display.screenResolution}</dd>
                        <dt>Touch screen</dt>
                        <dd>{utilityCheckmark(phone.display.touchScreen)}</dd>
                    </dl>
                </li>
                <li>
                    <span>Hardware</span>
                    <dl>
                        <dt>CPU</dt>
                        <dd>{phone.hardware.cpu}</dd>
                        <dt>USB</dt>
                        <dd>{phone.hardware.usb}</dd>
                        <dt>Audio / headphone jack</dt>
                        <dd>{phone.hardware.audioJack}</dd>
                        <dt>FM Radio</dt>
                        <dd>{utilityCheckmark(phone.hardware.fmRadio)}</dd>
                        <dt>Accelerometer</dt>
                        <dd>{utilityCheckmark(phone.hardware.accelerometer)}</dd>
                    </dl>
                </li>
                <li>
                    <span>Camera</span>
                    <dl>
                        <dt>Primary</dt>
                        <dd>{phone.camera.primary}</dd>
                        <dt>Features</dt>
                        <dd>{phone.camera.features.join(', ')}</dd>
                    </dl>
                </li>
                <li>
                    <span>Additional Features</span>
                    <dd>{phone.additionalFeatures}</dd>
                </li>
            </ul>

        </>
    )
}

export default PhoneDetail