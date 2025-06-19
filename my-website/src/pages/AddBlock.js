const totalAds = CalculateTotalAds()

// Ad constants
const CookiesAd = 0
const WizardSpinnerAd = 1



function CalculateTotalAds() {
    return 2
}

function GetRandomAd(totalAds){
    return (Math.floor(Math.random() * totalAds))
}

function AddBlock() {
    let ad = GetRandomAd(totalAds)

    let adImage = "/Ads/";
    let altText = "A fake advertisement showing";
    
    switch(ad) {
        case CookiesAd:
            adImage += "Cookies.png";
            altText += "a drawn image of cookies in a glass jar. The text around the image reads 'free cookies, click here'. Under the image the text reads 'These cookies serve no purpose. By clicking here you agree to have them on your device.'";
            break;
        case WizardSpinnerAd:
            adImage += "WizardSpinner.png";
            altText += "a drawn image of a wizard hat and cloak with the bold text 'SICK OF WIZARDS WHO WON'T FACE YOU? DOWNLOAD WIZARD SPINNER HERE FOR FREE'. Smaller text reads 'They really spin!* *Wizards may or may not spin'.";
            break;
        default:
            // Wizard spinner ad
            adImage += "WizardSpinner.png";
            altText += "a drawn image of a wizard hat and cloak with the bold text 'SICK OF WIZARDS WHO WON'T FACE YOU? DOWNLOAD WIZARD SPINNER HERE FOR FREE'. Smaller text reads 'They really spin!* *Wizards may or may not spin'.";
        }
    return (

        <div className="AddBlock">
            <img src={adImage} width="260" alt={altText}></img>
            <img src={adImage} width="260" alt={altText}></img>
        </div>

    )
}

export default AddBlock