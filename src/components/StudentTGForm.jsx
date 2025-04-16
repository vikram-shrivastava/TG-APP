import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const StudentTGForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    rollNumber: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    email: currentUser?.email || '',
    mobileNumber: '',
    
    // Academic Information
    semester: '',
    branch: '',
    batch: '',
    cgpa: '',
    
    // Residence Information
    currentAddress: '',
    permanentAddress: '',
    hostelRoom: '',
    isHostelResident: false,
    
    // Family Information
    fatherName: '',
    fatherOccupation: '',
    fatherMobile: '',
    motherName: '',
    motherOccupation: '',
    motherMobile: '',
    
    // Additional Information
    achievements: '',
    extracurricular: '',
    healthIssues: '',
    careerGoals: '',
    
    // Academic Performance
    subjects: [
      { name: 'Subject 1', attendancePercentage: '', currentMarks: '', maxMarks: '' },
      { name: 'Subject 2', attendancePercentage: '', currentMarks: '', maxMarks: '' },
      { name: 'Subject 3', attendancePercentage: '', currentMarks: '', maxMarks: '' },
      { name: 'Subject 4', attendancePercentage: '', currentMarks: '', maxMarks: '' },
      { name: 'Subject 5', attendancePercentage: '', currentMarks: '', maxMarks: '' }
    ]
  });
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle subject change
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [field]: value
    };
    
    setFormData(prevData => ({
      ...prevData,
      subjects: updatedSubjects
    }));
  };
  
  // Handle subject name change
  const handleSubjectNameChange = (index, value) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      name: value
    };
    
    setFormData(prevData => ({
      ...prevData,
      subjects: updatedSubjects
    }));
  };
  
  // Add more subjects
  const addSubject = () => {
    setFormData(prevData => ({
      ...prevData,
      subjects: [
        ...prevData.subjects,
        { name: `Subject ${prevData.subjects.length + 1}`, attendancePercentage: '', currentMarks: '', maxMarks: '' }
      ]
    }));
  };
  
  // Remove subject
  const removeSubject = (index) => {
    const updatedSubjects = [...formData.subjects];
    updatedSubjects.splice(index, 1);
    
    setFormData(prevData => ({
      ...prevData,
      subjects: updatedSubjects
    }));
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    try {
      // Here you would normally make an API call to your backend
      // For demonstration, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSuccessMessage('Your TG form has been submitted successfully. Your teacher will review it shortly.');
      
      // In a real app, you might redirect after a delay
      setTimeout(() => {
        // console.log(formData)
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Failed to submit the form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8">Student Teacher Guardian (TG) Form</h1>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        {/* Personal Information Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Roll Number *</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Mobile Number *</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </section>
        
        {/* Academic Information Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Academic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Semester *</label>
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Branch/Department *</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Branch</option>
                <option value="cse">Computer Science Engineering</option>
                <option value="it">Information Technology</option>
                <option value="ece">Electronics & Communication</option>
                <option value="eee">Electrical Engineering</option>
                <option value="mech">Mechanical Engineering</option>
                <option value="civil">Civil Engineering</option>
                <option value="chem">Chemical Engineering</option>
                <option value="biotech">Biotechnology</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Batch *</label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                placeholder="e.g., 2021-2025"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Current CGPA</label>
              <input
                type="number"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="e.g., 8.5"
                min="0"
                max="10"
                step="0.01"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>
        
        {/* Residence Information Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Residence Information</h2>
          <div className="mb-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isHostelResident"
                name="isHostelResident"
                checked={formData.isHostelResident}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="isHostelResident" className="text-gray-700">I am a hostel resident</label>
            </div>
          </div>
          
          {formData.isHostelResident && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Hostel & Room Number</label>
              <input
                type="text"
                name="hostelRoom"
                value={formData.hostelRoom}
                onChange={handleChange}
                placeholder="e.g., Boys Hostel Block-A, Room 203"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Current Address *</label>
            <textarea
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Permanent Address *</label>
            <textarea
              name="permanentAddress"
              value={formData.permanentAddress}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
        </section>
        
        {/* Family Information Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Family Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Father's Occupation</label>
              <input
                type="text"
                name="fatherOccupation"
                value={formData.fatherOccupation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Father's Mobile Number *</label>
              <input
                type="tel"
                name="fatherMobile"
                value={formData.fatherMobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Mother's Name *</label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Mother's Occupation</label>
              <input
                type="text"
                name="motherOccupation"
                value={formData.motherOccupation}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Mother's Mobile Number</label>
              <input
                type="tel"
                name="motherMobile"
                value={formData.motherMobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>
        
        {/* Academic Performance Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Current Semester Subjects</h2>
          <div className="overflow-x-auto">
            <table className="w-full mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Subject Name</th>
                  <th className="px-4 py-2 text-left">Attendance (%)</th>
                  <th className="px-4 py-2 text-left">Current Marks</th>
                  <th className="px-4 py-2 text-left">Max Marks</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.subjects.map((subject, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) => handleSubjectNameChange(index, e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={subject.attendancePercentage}
                        onChange={(e) => handleSubjectChange(index, 'attendancePercentage', e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        value={subject.currentMarks}
                        onChange={(e) => handleSubjectChange(index, 'currentMarks', e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="0"
                        value={subject.maxMarks}
                        onChange={(e) => handleSubjectChange(index, 'maxMarks', e.target.value)}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {formData.subjects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSubject(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={addSubject}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Add Subject
            </button>
          </div>
        </section>
        
        {/* Additional Information Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Additional Information</h2>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Achievements / Certifications</label>
            <textarea
              name="achievements"
              value={formData.achievements}
              onChange={handleChange}
              rows="3"
              placeholder="List any academic achievements, certifications, or competitions you've participated in"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Extracurricular Activities</label>
            <textarea
              name="extracurricular"
              value={formData.extracurricular}
              onChange={handleChange}
              rows="3"
              placeholder="Sports, clubs, volunteering, etc."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Health Issues (if any)</label>
            <textarea
              name="healthIssues"
              value={formData.healthIssues}
              onChange={handleChange}
              rows="2"
              placeholder="Any medical conditions your teacher should be aware of"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1">Career Goals & Aspirations</label>
            <textarea
              name="careerGoals"
              value={formData.careerGoals}
              onChange={handleChange}
              rows="3"
              placeholder="What are your career plans after graduation?"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </section>
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit TG Form'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentTGForm;