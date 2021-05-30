# TennisBooking

Sovellus mahdollistaa kuvitteellisen tenniskentän varauksen suoraan webissä, joten pelaajien ei tarvitsee enää mennä fyysisesti tenniskentälle varaamaan vuoroa paperisille varauslistoille vaan varaus hoituu käytännössä millä vain internettiin yhteydessä olevalla päätelaitteella (tietokone, tabletti, puhelin).
Sovellus näyttää käyttäjän tekemät varaukset ja vapaana olevat ajat kullekkin päivälle. Sovellus vaatii toimiakseen internetyhteyden, jonka vuoksi emme nähneet tarpeelliseksi tehdä sovelluksesta PVA-sovellusta.

## Sovelluksen toiminnallisuus

Sovelluksen käyttäjä saapuu ensimmäisenä sisäänkirjautumisnäkymään, josta hän pääsee kirjautumaan sisään sovellukseen. Uuden käyttäjän tulee ensin rekisteröityä palvelun käyttäjäksi ennen kuin hän pääsee kirjautumaan sisään palveluun. Rekisteröitymisvaiheessa käyttäjältä kysytään nimi ja sähköpostiosoite. Näitä tietoja hyödynnetään varauksien tallentamisessa. Käyttäjällä on myös vaihtoehtoisesti mahdollisuus kirjautua sisään Google-tunnuksilla eikä erillistä rekisteröitymistä tuolloin tarvitse tehdä.

Sisäänkirjautumisen jälkeen käyttäjälle avautuu näkymä, jossa hän näkee kaikki omat varauksensa "Omat varaukset" -kohdasta ja tämän alapuolella on toinen näkymä josta on mahdollista tehdä uusi kenttävaraus. Uusi kenttävaraus tallentuu automaattisesti "Omat varaukset" -näkymään ja sieltä käyttäjän on myös mahdollista vielä perua tekemiään varauksia.

Palvelun ylläpitäjällä on pääsy admin-näkymään, josta voi nähdä ja hallinnoida kaikkia sovellukseen tehtyjä varauksia.

## Kuvaus teknologiosta

Lyhyehkö kuvaus eri teknologioiden käyttämisestä työssä.

- Angular, Angular Material, Firebase, Angular Firebase, Firebase Authentication ja Firestore. Web-teknologioina käytetty HTML, CSS ja Typescript.

## Komennot, joilla kehitysversion saa Githubista omalle koneelle toimimaan:

Mikäli haluat pääsyn admin-näkymään ole yhteydessä projektin tekijöihin niin luomme käyttäjällesi oikeudet admin-näkymään.

Projektin lataaminen GitHubista:

$ git clone https://github.com/LauriTaskinen/tennis-booking.git

Projektin asennus:
$ npm i

Sovelluksen käynnistäminen:
$ npm start

## Reflektio ja ajankäyttö

Miten työ onnistui? Mikä oli helppoa, mikä vaikeaa?
Kuinka paljon käytit aikaa loppuharjoitustyön tekemiseen?
Mitä tietoja/taitoja sinun tulee vielä kehittää?

Lauri:

Angularin peruslogiikka ja arkkitehtuuri oli omasta mielestäni aika hyvin hallussa ja projektin runko sekä reititys oli suht helppoa luoda. Pienen kertauksen jälkeen Gitin ja GitHubin käyttö oli helppoa ja todellä kätevää varsinkin kun meitä oli kaksi tekijää. Firebasen ja Firestoren käyttöliittymien käyttäminen oli helppoa. Myöskään käytetyt web-tekniikat ei tuottanut juurikaan ongelmia.

Ensimmäiseksi täysin itse kehittämäksi sovellukseksi pieniä haasteita oli aluksi vähän joka osa-alueella ja aikaa kului paljon tiedon hakemiseen ja jo koulutuksen aikana oppimien asioiden sisäistämiseen. Isoimmat haasteet itselläni oli halutun tiedon käsitteleminen frontendin ja backendin välillä. Sovellukseen rekisteröityminen, sisäänkirjautuminen ja varausjärjestelmän toimiminen perustuu paljon serviceissä tapahtuvaan sovelluslogiikkaan, jonka yhdistäminen muihin komponentteihin oli välillä sekavaa. Tiedon vieminen Firestoreen ja sen hakeminen Firestoresta oli ajoittain onglemallista.

Omalta osaltani lopputyöhön kului paljon enemmän aikaa kuin kahteen opintopisteeseen vaadittu keskimääräinen 54 tuntia, koska aikaa kului paljon ongelmien korjaamiseen ja asioiden uudelleen tekemiseen. Jokainen käytetty työtunti oli kuitenkin äärimmäisen opettavaista ja sain paljon lisää osaamista ja itsevarmuutta full stack web-sovelluskehitykseen.

Kehitettävää on vielä paljon jokaisella osa-alueella. Haluaisin erityisesti osata käyttää ja ymmärtää paremmin erilaisia tietorakenteita ja algoritmejä. Näiden ns. ulkoaosaaminen auttaisi paljon tulevaisuuden projekteissa.

Eeva:

Kuinka paljon käytit aikaa loppuharjoitustyön tekemiseen?

Lauri:

Eeva:

Mitä tietoja/taitoja sinun tulee vielä kehittää?

Lähteet:

Admin-datan käsittelyssä hyödynnetty:
https://material.angular.io/components/sort/overview