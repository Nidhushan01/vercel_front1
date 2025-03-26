import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios"; // Make sure axios is imported

// images
import Logo from "../../assets/images/Logo.jpg"
import first from "../../assets/images/Dashboard/first.png"
import diary from "../../assets/images/Dashboard/diary.png"
import masseur from "../../assets/images/Dashboard/masseur_details.png"
import progress from "../../assets/images/Dashboard/progress.png"
import Footer from "../../components/Footer";

const Dashboard = () => {
    // State for profile data
    const [profileData, setProfileData] = useState({
        age: "23",
        gender: "Male",
        address: "Batticaloa",
        emergencyNo: "0775484271"
    });
    
    // State for UI controls
    const [showProfile, setShowProfile] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // State for form inputs while editing
    const [formData, setFormData] = useState({...profileData});
    
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setShowProfile(!showProfile);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };
    
    // Handle the edit button click
    const handleEditClick = () => {
        setIsEditing(true);
        // Initialize form data with current profile data
        setFormData({...profileData});
    };
    
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Reset error state
        setError(null);
        setIsLoading(true);
        
        try {
            // Get the token from localStorage (adjust if your token is stored elsewhere)
            const token = localStorage.getItem('token');
            
            if (!token) {
                throw new Error("Authentication token not found. Please login again.");
            }
            
            // Make the API call with the authorization header
            const response = await axios.put(
                'http://localhost:5000/auth/update', 
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            // Update the profile data with the response from the API
            // If your API returns the updated user data, use that instead
            if (response.data && response.data.user) {
                setProfileData(formData);
            } else {
                // If API doesn't return updated data, use form data
                setProfileData(formData);
            }
            
            // Exit edit mode
            setIsEditing(false);
            
            // Optional: Show success message
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            
            // Set error message based on error response
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to update profile. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    // Handle cancel button click
    const handleCancel = () => {
        setIsEditing(false);
        setError(null);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto bg-white px-4 sm:px-6 md:px-8 lg:px-16 overflow-hidden">
            {/* Header Section */}
            <header className="flex items-center py-4 md:py-6 w-full">
                {/* Logo */}
                <div className="flex items-center">
                    <img src={Logo} alt="XhaleFit Logo" className="w-32 md:w-40 lg:w-48" />
                </div>
                
                {/* Desktop Navigation - Centered */}
                <nav className="hidden md:flex flex-grow items-center justify-center gap-6 text-lg">
                    <a href="#" className="text-gray-600 hover:text-black">Home</a>
                    <a href="#" className="text-gray-600 hover:text-black">Features</a>
                    <a href="#" className="text-gray-600 hover:text-black">Services</a>
                    <a href="#" className="text-gray-600 hover:text-black">Contact</a>
                    <a href="#" className="text-gray-600 hover:text-black">About Us</a>
                </nav>
                
                {/* Right side icons */}
                <div className="flex items-center gap-4 md:gap-6 ml-auto">
                    {/* Bell Icon - Visible on all screens */}
                    <div className="relative">
                        <FaBell className="text-gray-600 text-xl md:text-2xl cursor-pointer hover:text-black" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            3
                        </span>
                    </div>
                    
                    {/* Profile Icon - Visible on all screens */}
                    <div 
                        onClick={handleProfileClick} 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center">
                        <span className="text-sm md:text-lg text-white">P</span>
                    </div>
                    
                    {/* Mobile menu toggle - Only visible on mobile */}
                    <button onClick={toggleMobileMenu} className="md:hidden text-xl text-gray-600 ml-2">
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </header>
            
            {/* Mobile Navigation Menu - Only visible when toggled */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-white shadow-md py-2 rounded-lg mt-2 z-20">
                    <a href="#" className="block text-gray-600 hover:text-black p-3 border-b border-gray-100">Home</a>
                    <a href="#" className="block text-gray-600 hover:text-black p-3 border-b border-gray-100">Features</a>
                    <a href="#" className="block text-gray-600 hover:text-black p-3 border-b border-gray-100">Services</a>
                    <a href="#" className="block text-gray-600 hover:text-black p-3 border-b border-gray-100">Contact</a>
                    <a href="#" className="block text-gray-600 hover:text-black p-3">About Us</a>
                </nav>
            )}
            
            {/* Profile Popup */}
            {showProfile && (
                <div className="absolute right-4 sm:right-6 md:right-8 lg:right-16 top-16 md:top-20 z-10 bg-white p-4 md:p-6 rounded-lg shadow-lg w-64">
                    <h3 className="text-xl font-bold">User Profile</h3>
                    
                    {isEditing ? (
                        // Edit mode - Show form
                        <form onSubmit={handleSubmit} className="mt-2">
                            <div className="mb-3">
                                <label className="block text-sm text-gray-600 mb-1">Age</label>
                                <input 
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="block text-sm text-gray-600 mb-1">Gender</label>
                                <select 
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <label className="block text-sm text-gray-600 mb-1">Address</label>
                                <input 
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label className="block text-sm text-gray-600 mb-1">Emergency No</label>
                                <input 
                                    type="text"
                                    name="emergencyNo"
                                    value={formData.emergencyNo}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            
                            {/* Error message */}
                            {error && (
                                <div className="mt-2 text-red-500 text-sm">
                                    {error}
                                </div>
                            )}
                            
                            <div className="flex gap-2 mt-4">
                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className={`flex-1 px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-black'} text-white rounded-lg`}
                                >
                                    {isLoading ? 'Saving...' : 'Save'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        // View mode - Show profile data
                        <>
                            <p className="mt-2">Age: {profileData.age}</p>
                            <p>Gender: {profileData.gender}</p>
                            <p>Address: {profileData.address}</p>
                            <p>Emergency No: {profileData.emergencyNo}</p>
                            <button 
                                onClick={handleEditClick}
                                className="mt-4 px-4 py-2 bg-black text-white rounded-lg w-full"
                            >
                                Edit Profile
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Hero Section */}
            <section className="mt-8 md:mt-12 lg:mt-16">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="w-full md:w-3/5">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center md:text-left">
                            <span className="text-black">Customizable</span> <br />
                            <span className="text-black">Rehabilitation Plans</span>
                        </h2>
                        <p className="mt-4 text-base lg:text-lg text-gray-600 text-center md:text-left">
                            Rehabilitation isn't one-size-fits-all, and neither are our plans! With XhaleFit,
                            you get personalized recovery programs designed to match your body's needs.
                        </p>
                        <div className="mt-6 flex justify-center md:justify-start">
                            <button 
                                onClick={() => navigate("/customize")} 
                                className="px-5 py-2 md:px-6 md:py-3 bg-black text-white rounded-lg text-base md:text-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Get Started!
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Image Section */}
            <div className="mt-8 md:mt-12 lg:mt-16 flex justify-center w-full">
                <img src={first} alt="Rehabilitation" className="w-full rounded-lg shadow-lg" />
            </div>
            
            {/* Feature Sections */}
            {[
                { title: "Training Diary", img: diary, description: "Track your fitness journey effortlessly with XhaleFit's Training Diary! Log your workouts, monitor progress, and reflect on achievements." },
                { title: "Masseur Details", img: masseur, description: "Relax, recover, and rejuvenate with expert masseur services! Our skilled professionals help you relieve stress." },
                { title: "Progress", img: progress, description: "Growth happens when you push beyond limits and track your journey. Visualize your progress and stay inspired." }
            ].map((section, index) => (
                <section key={index} className="mt-12 md:mt-16 lg:mt-20">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        <div className="w-full md:w-3/5">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center md:text-left">
                                <span className="text-black">{section.title}</span>
                            </h2>
                            <p className="mt-4 text-base lg:text-lg text-gray-600 text-center md:text-left">
                                {section.description}
                            </p>
                            <div className="mt-6 flex justify-center md:justify-start">
                                <button className="px-5 py-2 md:px-6 md:py-3 bg-black text-white rounded-lg text-base md:text-lg font-medium hover:bg-gray-800 transition-colors">
                                    View {section.title === "Training Diary" ? "Diary" : "Details"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 md:mt-8 flex justify-center w-full">
                        <img src={section.img} alt={section.title} className="w-full rounded-lg" />
                    </div>
                </section>
            ))}
            
            <div className="mt-12 md:mt-16 lg:mt-20">
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;