import './cssComponent/AboutUs.css';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import documents from './assets/Lady Presenter.svg'
import buisnesscontract from './assets/business-contract.svg'

const AboutUs = () => {
  return (
    <div className='aboutdiv'>
      <main className='aboutmain'>
        <section id="about">
          <h1 style={{ textAlign: 'center' }}>About Us</h1>
          <p style={{ textAlign: 'center' }}>
            At ASAP System, we are committed to breaking down the barriers that you face in a job search.
            Our powerful tools are designed to empower individuals and businesses to create job ,accept job
            and reach a good position. We are passionate about helping everyone, from beginners to seasoned experts,
            succeed on their digital journey.
          </p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/about-us-1805547-1537820.png"
            alt="About Us"
            style={{ display: 'block', margin: '0 auto', maxWidth: '80%' }}
          />
        </section>

        <section id="mission-vision">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide innovative technology solutions that enable businesses to thrive in the digital landscape.
            We strive to deliver tailored strategies that meet the unique needs of each client, ensuring maximum impact and success.
          </p>
         <img src={documents}
            alt="Our Team"
            style={{ display: 'block', margin: '20px auto', maxWidth: '25%' }}
          />
          </section>

        <section id="mission-vision">
        
          
          <h2>Our Vision</h2>
          <p>
            We envision a world where everyone has the tools and resources to create their own online presence and achieve their goals,
            regardless of technical expertise or financial constraints.
          </p>
          <img
            src={buisnesscontract}
            alt="Our Team"
            style={{ display: 'block', margin: '20px auto', maxWidth: '40%' }}
          />
        </section>

        <section id="services">
          <h2>What We Offer</h2>
          <div className="service-container">
            <div className="service">
              <h3>Rcruitment</h3>
              <p>We provide a high potential recruitment platform for freshers as well as rthe experienced candidates.</p>
            </div>
            <div className="service">
              <h3>Mentorship</h3>
              <p>Our team builds monitored enviorment for the needed personsalities to enhance them-selves.</p>
              
            </div>
            <div className="service">
              <h3>Carriers</h3>
              <p>We create high-quality job vacancies that provide a seamless job stantards and meet your carrier objectives.</p>
              
            </div>
          </div>
        </section>

        <section id="team">
          <h2>Meet Our Team</h2>
          <p>
            Our dedicated team of professionals brings a wealth of experience and expertise across various domains.
            We are passionate about what we do and are committed to delivering excellence in every project we undertake.
          </p>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/teamwork-3560853-2989144.png"
            alt="Our Team"
            style={{ display: 'block', margin: '20px auto', maxWidth: '80%' }}
          />
        </section>

        <section id="contact">
          <h2>Contact Us <ConnectWithoutContactIcon /></h2>
          <p>If you would like to learn more about our services or discuss how we can help your carrier, please reach out!</p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:asap@gmail.com" style={{ color: '#f4f4f4' }}>asap@gmail.com</a></p>
            <p><strong>Phone:</strong> <a href="tel:+91 8590551239" style={{ color: '#f4f4f4' }}>+1 248 672 1972</a></p>
            <p><strong>Address:</strong> E-city phase-2,Bengalur,Karnatak,India</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;
