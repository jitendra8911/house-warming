import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <h1>🎉 You're Invited!</h1>
            <p>We’re so excited to welcome you to our new home.</p>
            <Link to="/rsvp">Click here to RSVP</Link>
        </div>
    );
};

export default Home;
