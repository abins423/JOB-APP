
const PageNotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.message}>
        Oops! The page you are looking for doesn&#39t exist.
      </p>
      
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '48px',
    color: '#ff4040',
  },
  message: {
    fontSize: '18px',
    color: '#333',
  },
  link: {
    fontSize: '20px',
    color: '#007bff',
    textDecoration: 'none',
    marginTop: '20px',
  },
};

export default PageNotFound;
