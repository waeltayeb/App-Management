import logo from './logo.png'; // Import the logo image

export default function ApplicationLogo(props) {
    return (
        <img
            src={logo} // Use the imported logo image
            className=" w-14" // Corrected className
            alt="logo image" />
    );
}
