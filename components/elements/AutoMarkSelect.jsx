import styles from '../../styles/Category.module.css'

const AutoMarkSelect = ({onSelectVehicle}) => {
  return (
    <select className={styles.categorySelect} onChange={onSelectVehicle} defaultValue="hidden" placeholder="make" name="Make" id="make">
      <option  hidden value="hidden">All</option>
      <option>all</option>
      <option>A+A Hahn</option>
      <option>Abarth</option>
      <option>Abbey</option>
      <option>Abi</option>
      <option>ABT</option>
      <option>Access</option>
      <option>Adria</option>
      <option>Ahorn</option>
      <option>Aixam</option>
      <option>AJP</option>
      <option>Akerman</option>
      <option>Albin</option>
      <option>Alfa Romeo</option>
      <option>Alpina</option>
      <option>Alpine</option>
      <option>Alunaut</option>
      <option>Amazone</option>
      <option>Ammann</option>
      <option>Amor</option>
      <option>AMS</option>
      <option>AMT</option>
      <option>Amuur</option>
      <option>Andover</option>
      <option>Anssems</option>
      <option>Anytec</option>
      <option>Apex</option>
      <option>Apollo</option>
      <option>Aprilia</option>
      <option>Aquador</option>
      <option>Arcas Trailer</option>
      <option>Arctic Cat</option>
      <option>Argo</option>
      <option>Aston Martin</option>
      <option>Atlas</option>
      <option>ATM</option>
      <option>Audi</option>
      <option>Avant</option>
      <option>Avondale</option>
      <option>Bailey</option>
      <option>Bavaria</option>
      <option>Bayliner</option>
      <option>Belarus</option>
      <option>Bella</option>
      <option>Bellanger</option>
      <option>Bellier</option>
      <option>Benalu</option>
      <option>Benelli</option>
      <option>Beneteau</option>
      <option>Bentley</option>
      <option>Berger</option>
      <option>Berkut</option>
      <option>Beta</option>
      <option>Beyerland</option>
      <option>Big Dog</option>
      <option>BLYSS-Transporttechnik</option>
      <option>BMW</option>
      <option>Bobcat</option>
      <option>Bodex</option>
      <option>Bomag</option>
      <option>Bombard</option>
      <option>Bombardier</option>
      <option>Boro</option>
      <option>Boston Whaler</option>
      <option>Bova</option>
      <option>Branson</option>
      <option>BRAVO</option>
      <option>Brenderup</option>
      <option>Brentex-Trailer</option>
      <option>Briab</option>
      <option>Brian James Trailers</option>
      <option>Brig</option>
      <option>Broshuis</option>
      <option>BT</option>
      <option>Buell</option>
      <option>Buick</option>
      <option>B??rstner</option>
      <option>Bush</option>
      <option>Buster</option>
      <option>Cadillac</option>
      <option>Cagiva</option>
      <option>Can-Am</option>
      <option>Carado</option>
      <option>Caravelair</option>
      <option>Carnehl</option>
      <option>Carthago</option>
      <option>Casalini </option>
      <option>Case</option>
      <option>CAT / Caterpillar</option>
      <option>Centurion</option>
      <option>CFMOTO</option>
      <option>CHAMP</option>
      <option>Chateau</option>
      <option>Chatenet</option>
      <option>Chevrolet</option>
      <option>Chieftain</option>
      <option>Chris-Craft</option>
      <option>Chrysler</option>
      <option>CI</option>
      <option>Citroen</option>
      <option>CMT</option>
      <option>Coachman</option>
      <option>Cobra</option>
      <option>Conrad</option>
      <option>CPI</option>
      <option>Cranchi</option>
      <option>Crown</option>
      <option>Cuppers</option>
      <option>Cupra</option>
      <option>Dacia</option>
      <option>Daewoo</option>
      <option>DAF</option>
      <option>Daihatsu</option>
      <option>Daimler</option>
      <option>DAPA</option>
      <option>Datsun</option>
      <option>Delphia</option>
      <option>Dethleffs</option>
      <option>DFSK</option>
      <option>Dieci</option>
      <option>DinoLift</option>
      <option>Dodge</option>
      <option>Dong Feng</option>
      <option>Doosan</option>
      <option>Dragonfly</option>
      <option>DS</option>
      <option>Ducati</option>
      <option>Dulkan</option>
      <option>Dynapac</option>
      <option>E-Ton</option>
      <option>Ebroh</option>
      <option>Eduard</option>
      <option>Ekeri</option>
      <option>EKIPLUS</option>
      <option>Elddis</option>
      <option>Electric Motion</option>
      <option>Elgo-Plus</option>
      <option>Elnagh</option>
      <option>Eriba</option>
      <option>Europe</option>
      <option>Everun</option>
      <option>Falcon</option>
      <option>Fantic</option>
      <option>Faster</option>
      <option>Faun</option>
      <option>Faymonville</option>
      <option>Feldbinder</option>
      <option>Fendt</option>
      <option>Ferrari</option>
      <option>Ferrel</option>
      <option>Fiat</option>
      <option>Fiat-Hitachi</option>
      <option>Fiatagri</option>
      <option>Finnmaster</option>
      <option>Finnsport</option>
      <option>Fliegl</option>
      <option>Flipper</option>
      <option>Folkboot</option>
      <option>Ford</option>
      <option>Formula</option>
      <option>Foton</option>
      <option>Four Winns</option>
      <option>FRANKIA</option>
      <option>Fruehauf</option>
      <option>Furukawa</option>
      <option>Galeon</option>
      <option>Gas Gas</option>
      <option>GAZ</option>
      <option>Gehl</option>
      <option>Genie</option>
      <option>Gilera</option>
      <option>GINAF</option>
      <option>Giotti Line</option>
      <option>Gladiator</option>
      <option>Glastron</option>
      <option>GMC</option>
      <option>Goldhofer</option>
      <option>Grand</option>
      <option>Grandezza</option>
      <option>Grecav</option>
      <option>Grove</option>
      <option>Gruau</option>
      <option>Grunwald</option>
      <option>Hamm</option>
      <option>Hammar</option>
      <option>Hanomag</option>
      <option>Hapert</option>
      <option>Harley-Davidson</option>
      <option>HC</option>
      <option>Heinemann</option>
      <option>Henra</option>
      <option>HFR</option>
      <option>Hidromek</option>
      <option>Highfield</option>
      <option>Hightop</option>
      <option >Hino</option>
      <option>HISUN</option>
      <option >Hitachi</option>
      <option>Hobby</option>
      <option>Honda</option>
      <option>Hudson</option>
      <option >H??ffermann</option>
      <option >Hulco</option>
      <option >Hummer</option>
      <option >Husaberg</option>
      <option >Husqvarna</option>
      <option >Hymer</option>
      <option>Hyundai</option>
      <option >IFA</option>
      <option>Inca</option>
      <option>Indian</option>
      <option >Indox</option>
      <option >Infiniti</option>
      <option>Iseki</option>
      <option>Isuzu</option>
      <option>Iveco</option>
      <option >IZ</option>
      <option>Jaguar</option>
      <option >Janmil</option>
      <option>Jansen</option>
      <option >Jawa</option>
      <option >JCB</option>
      <option>JDM</option>
      <option>Jeanneau</option>
      <option>Jeep</option>
      <option>JENZ</option>
      <option>JLG</option>
      <option>John Deere</option>
      <option>Jumbo</option>
      <option>Jungheinrich</option>
      <option>K</option>
      <option>Kabe</option>
      <option>Kaiser</option>
      <option>Kaisla</option>
      <option>Kamaz</option>
      <option>K??ssbohrer</option>
      <option>Kautec</option>
      <option>Kawasaki</option>
      <option>Kayo</option>
      <option>Kazanka</option>
      <option >Keeway</option>
      <option >Kel-berg</option>
      <option>Kewner</option>
      <option>Kia</option>
      <option>Kiili</option>
      <option>King</option>
      <option>KIP</option>
      <option>Knapen</option>
      <option>Knaus</option>
      <option>Kobelco</option>
      <option>K??gel</option>
      <option >Komatsu</option>
      <option>Kome</option>
      <option>Kraker</option>
      <option>Krone</option>
      <option>KTM</option>
      <option>Kuberg</option>
      <option >Kubota</option>
      <option >Kuhn</option>
      <option>KXD</option>
      <option >Kymco</option>
      <option>Lada</option>
      <option>LAG</option>
      <option>Laika</option>
      <option>Lamborghini</option>
      <option>Lancia</option>
      <option>Land Rover</option>
      <option >Langendorf</option>
      <option>LarsenB</option>
      <option >Larson</option>
      <option >Lemken</option>
      <option>Lexus</option>
      <option >Liebherr</option>
      <option>Lifestylecamper</option>
      <option >Ligier</option>
      <option>Lincoln</option>
      <option >Linde</option>
      <option>Linexa</option>
      <option>Lingalaid</option>
      <option>Linhai</option>
      <option >LMC</option>
      <option>Lorries</option>
      <option>Lotus</option>
      <option>LUAZ</option>
      <option>Lunar</option>
      <option>LYNX</option>
      <option>M</option>
      <option>M &amp; V</option>
      <option>MacGregor</option>
      <option>MAN</option>
      <option >Manitou</option>
      <option>Marex</option>
      <option>Maserati</option>
      <option>Mash</option>
      <option >Massey Ferguson</option>
      <option>Master Pro</option>
      <option>Master Yachts</option>
      <option >Matkaaja</option>
      <option >Maxum</option>
      <option >MAZ</option>
      <option>Mazda</option>
      <option>McHale</option>
      <option >McLaren</option>
      <option>McLouis</option>
      <option>Mega</option>
      <option >Meiller</option>
      <option>Mercedes-AMG</option>
      <option>Mercedes-Benz</option>
      <option>Mercury</option>
      <option >Merlo</option>
      <option>Messersi</option>
      <option>Microcar</option>
      <option >MINI</option>
      <option>Mitsubishi</option>
      <option>Mitsubishi Fuso</option>
      <option >Mobilvetta</option>
      <option>Mono-Transserviss</option>
      <option >Moskvich</option>
      <option >Moto Guzzi</option>
      <option>MTZ</option>
      <option>Muck-Truck</option>
      <option >M??ller Mitteltal</option>
      <option>Multione</option>
      <option>M??nsterland</option>
      <option>MV Agusta</option>
      <option>MV-Marin</option>
      <option>MZ</option>
      <option>N??rko</option>
      <option>Nautique</option>
      <option>Neoplan</option>
      <option>Neptun</option>
      <option>New Holland</option>
      <option>Niewiadow</option>
      <option>Nimbus</option>
      <option>Nissan</option>
      <option>Nooteboom</option>
      <option>Nopa</option>
      <option>Nor Slep</option>
      <option>Nord</option>
      <option>Nordkapp</option>
      <option >Nordline</option>
      <option>NorthSilver</option>
      <option >NTM</option>
      <option >O&amp;K</option>
      <option>Ockelbo</option>
      <option>Odes</option>
      <option >Oldsmobile</option>
      <option >Omavalmistatud</option>
      <option>Oniar</option>
      <option>Opel</option>
      <option >Orion</option>
      <option >Orthaus</option>
      <option>OSET</option>
      <option>??zg??l Trailer</option>
      <option>Pacton</option>
      <option >Pakri</option>
      <option>Parator</option>
      <option>Parker</option>
      <option>Pentora</option>
      <option>Peugeot</option>
      <option >Piaggio</option>
      <option>Pioner</option>
      <option>Pitpro</option>
      <option>Polar</option>
      <option>Polaris</option>
      <option>Ponsse</option>
      <option>Pontiac</option>
      <option >Porsche</option>
      <option >P??SSL</option>
      <option >Powerscreen</option>
      <option>Prestige</option>
      <option >Princess</option>
      <option>Progress</option>
      <option >Qingqi</option>
      <option>Quarken</option>
      <option >Quicksilver</option>
      <option>RAF</option>
      <option>Ram</option>
      <option>Realcraft</option>
      <option >Regal</option>
      <option>Renault</option>
      <option >Respo</option>
      <option>Ridas</option>
      <option>Rieju</option>
      <option >Rimor</option>
      <option>Rinker</option>
      <option >RKP</option>
      <option>Roller Team</option>
      <option >Rolls-Royce</option>
      <option>Romana</option>
      <option>Rover</option>
      <option >Royal Enfield</option>
      <option>Ryds</option>
      <option>Rydwan</option>
      <option>Saab</option>
      <option>Sandstr??m</option>
      <option >Sany</option>
      <option>S??rki</option>
      <option>Saurer</option>
      <option>Saxdor</option>
      <option >Scandinaval</option>
      <option>Scania</option>
      <option>Schmitz</option>
      <option>Schwarzm??ller</option>
      <option>Schweriner</option>
      <option>Sea Doo</option>
      <option>Sea Ray</option>
      <option>SEAT</option>
      <option >Segway</option>
      <option >Setra</option>
      <option>Sherco</option>
      <option >Silver</option>
      <option>Simpa</option>
      <option>Sisu</option>
      <option >Ski Doo</option>
      <option>Skoda</option>
      <option >Smart</option>
      <option>Smartliner</option>
      <option>Snorkel</option>
      <option >Solifer</option>
      <option >Sommer</option>
      <option>SOR</option>
      <option >Sprite</option>
      <option>SsangYong</option>
      <option>STAS</option>
      <option>Stels</option>
      <option>STEMA</option>
      <option >Sterckeman</option>
      <option>Steyr</option>
      <option>Stiga</option>
      <option>Sting</option>
      <option>Subaru</option>
      <option>Sunbird</option>
      <option>Sunrunner</option>
      <option>Sunseeker</option>
      <option>Sunward</option>
      <option>Super SOCO</option>
      <option>Suvi</option>
      <option>Suzuki</option>
      <option>Swepac</option>
      <option>Swift</option>
      <option >SYM</option>
      <option>T-25</option>
      <option>T-40</option>
      <option >Tabbert</option>
      <option >Tang</option>
      <option>Targa</option>
      <option >TEC</option>
      <option>Tekno-Trailer</option>
      <option>TEMARED</option>
      <option>Temsa</option>
      <option>Terex</option>
      <option>Terhi</option>
      <option>Tesla</option>
      <option>Texas</option>
      <option>TGB</option>
      <option>Thompson</option>
      <option>Thule</option>
      <option>Tiki Treiler</option>
      <option>Tinger</option>
      <option>TM Racing</option>
      <option>Toyota</option>
      <option >Trabant</option>
      <option>Trailermate</option>
      <option >Trailis</option>
      <option >Triumph</option>
      <option >Trophy</option>
      <option>TRRS</option>
      <option>Tuna</option>
      <option >Tuula</option>
      <option>TWINCA</option>
      <option>TYM</option>
      <option>UAZ</option>
      <option>Ural</option>
      <option>Uttern</option>
      <option>Valiant</option>
      <option>Valmet</option>
      <option>Valtra</option>
      <option>Van Hool</option>
      <option>Vauxhall</option>
      <option>VAZ</option>
      <option>VBOATS</option>
      <option>Veles</option>
      <option>Venieri</option>
      <option>Vespa</option>
      <option>Victory</option>
      <option>Volkswagen</option>
      <option>Volvo</option>
      <option>Volzhanka</option>
      <option>WEINSBERG</option>
      <option>Whaly</option>
      <option>Wielton</option>
      <option>Wilk</option>
      <option>Wille</option>
      <option>X-motos</option>
      <option>XO</option>
      <option>Yadea</option>
      <option>Yamaha</option>
      <option>Yamarin</option>
      <option>Yanmar</option>
      <option>Zapporo</option>
      <option>Zaslaw</option>
      <option>ZAZ</option>
      <option>ZIL</option>
      <option>Zodiac</option>
      <option>Zoom</option>
      <option>Zorzi</option>
  </select>
  )
}

export default AutoMarkSelect