import './cssComponent/footer.css'
// You can add your custom CSS here

const Footer = () => {
  const currentDate = new Date();

// Get the current year
const currentYear = currentDate.getFullYear();
  return (
    <div className='footerdiv'>
    <footer>
      <div className="footer-content">
        

        <div className="contact-info">
          <h3>Contact Information</h3>
          <p>Email: <a href="mailto:contact@yourcompany.com">hireit@contact.com</a></p>
          <p>Phone: +91-8590551123</p>
          <p>Address:Bangalore.Karnataka,India, 560100</p>
        </div>

        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/aboutus">Contact Us</a></li>
            <li><a href="/terms">Terms of Service</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="social-media">
          <h3>Follow Us</h3>
          <p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> | 
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a> <br></br>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a><br></br>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a>|
          </p>
        </div>
        <div className="social-media">
          <h3>Our Partners</h3>
          <p>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a> | 
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">IBM</a>|
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Infosys</a> | 
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Capgemini</a><br></br>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a>|
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">Wipro</a> | 
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">NVIDIA</a> |
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">TCS</a>  <br></br>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Tech Park</a>|
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">KAN</a>|
            
          </p>
          </div>
        <form action="/subscribe" >
            <input type="email" placeholder="Subscribe to our newsletter" required/>
            <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear}HIRE-IT. All rights reserved. | <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Use</a></p>
      </div>
    </footer>
</div>
  );
};

export default Footer;
