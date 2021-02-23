import styles from './CookieConsent.module.scss';
import { Button } from 'reactstrap';

function CookieConsent({
    acceptCookie
}) {

    return (
        <div className={styles.container}>
            <div >Diese Website verwendet Cookies – nähere Informationen dazu und
            zu Ihren Rechten als Benutzer finden Sie in unserer Datenschutzerklärung am Ende der Seite. Klicken Sie auf
            „Ich stimme zu“, um Cookies zu akzeptieren und direkt unsere Website besuchen zu können.
            </div>
            <Button onClick={acceptCookie}>
                Akzeptieren
            </Button>
        </div>
    )
}

export default CookieConsent;