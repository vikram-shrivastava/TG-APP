import { useState, useEffect } from 'react';

const TeacherDashboard = ({authStatus}) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch students data
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchStudents = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data for demonstration
        const mockStudents = [
          {
            id: 1,
            name: 'Arjun Mehta',
            branch: 'Computer Science and Engineering',
            year: '3rd Year',
            email: 'arjun.mehta@university.edu.in',
            phone: '+91-9876543210',
            parentContact: 'sunita.mehta@gmail.com',
            attendance: 95,
            documents: [
              { id: 1, name: 'Bonafide Certificate', date: '2025-02-15' },
              { id: 2, name: 'Mini Project Report', date: '2025-03-10' }
            ],
            examMarks: [
              { subject: 'Data Structures and Algorithms', marks: 87, total: 100, date: '2025-03-15' },
              { subject: 'Computer Networks', marks: 92, total: 100, date: '2025-03-10' },
              { subject: 'Operating Systems', marks: 78, total: 100, date: '2025-03-05' },
              { subject: 'Database Management Systems', marks: 85, total: 100, date: '2025-02-28' }
            ]
          },
          {
            id: 2,
            name: 'Sneha Iyer',
            branch: 'Computer Science and Engineering',
            year: '3rd Year',
            email: 'sneha.iyer@university.edu.in',
            phone: '+91-9876543211',
            parentContact: 'rajesh.iyer@gmail.com',
            attendance: 98,
            documents: [
              { id: 3, name: 'Scholarship Certificate', date: '2025-01-20' }
            ],
            examMarks: [
              { subject: 'Data Structures and Algorithms', marks: 95, total: 100, date: '2025-03-15' },
              { subject: 'Computer Networks', marks: 90, total: 100, date: '2025-03-10' },
              { subject: 'Operating Systems', marks: 88, total: 100, date: '2025-03-05' },
              { subject: 'Database Management Systems', marks: 93, total: 100, date: '2025-02-28' }
            ]
          },
          {
            id: 3,
            name: 'Rohan Deshmukh',
            branch: 'Computer Science and Engineering',
            year: '3rd Year',
            email: 'rohan.deshmukh@university.edu.in',
            phone: '+91-9876543212',
            parentContact: 'smita.deshmukh@gmail.com',
            attendance: 85,
            documents: [
              { id: 4, name: 'Workshop Completion Certificate', date: '2025-02-05' },
              { id: 5, name: 'Medical Leave Application', date: '2025-01-15' }
            ],
            examMarks: [
              { subject: 'Data Structures and Algorithms', marks: 72, total: 100, date: '2025-03-15' },
              { subject: 'Computer Networks', marks: 68, total: 100, date: '2025-03-10' },
              { subject: 'Operating Systems', marks: 75, total: 100, date: '2025-03-05' },
              { subject: 'Database Management Systems', marks: 70, total: 100, date: '2025-02-28' }
            ]
          },
          {
            id: 4,
            name: 'Priya Sharma',
            branch: 'Computer Science and Engineering',
            year: '3rd Year',
            email: 'priya.sharma@university.edu.in',
            phone: '+91-9876543213',
            parentContact: 'anil.sharma@gmail.com',
            attendance: 92,
            documents: [],
            examMarks: [
              { subject: 'Data Structures and Algorithms', marks: 84, total: 100, date: '2025-03-15' },
              { subject: 'Computer Networks', marks: 89, total: 100, date: '2025-03-10' },
              { subject: 'Operating Systems', marks: 91, total: 100, date: '2025-03-05' },
              { subject: 'Database Management Systems', marks: 86, total: 100, date: '2025-02-28' }
            ]
          },
          {
            id: 5,
            name: 'Kunal Verma',
            branch: 'Computer Science and Engineering',
            year: '3rd Year',
            email: 'kunal.verma@university.edu.in',
            phone: '+91-9876543214',
            parentContact: 'neeta.verma@gmail.com',
            attendance: 88,
            documents: [
              { id: 6, name: 'Hackathon Participation Certificate', date: '2025-03-01' }
            ],
            examMarks: [
              { subject: 'Data Structures and Algorithms', marks: 76, total: 100, date: '2025-03-15' },
              { subject: 'Computer Networks', marks: 81, total: 100, date: '2025-03-10' },
              { subject: 'Operating Systems', marks: 85, total: 100, date: '2025-03-05' },
              { subject: 'Database Management Systems', marks: 78, total: 100, date: '2025-02-28' }
            ]
          }
        ];
        
        
        setStudents(mockStudents);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate class performance statistics
  const calculateClassStats = () => {
    if (students.length === 0) return { avgAttendance: 0, avgMarks: {} };
    
    const totalAttendance = students.reduce((sum, student) => sum + student.attendance, 0);
    const avgAttendance = totalAttendance / students.length;
    
    // Calculate average marks by subject
    const subjects = {};
    students.forEach(student => {
      student.examMarks.forEach(exam => {
        if (!subjects[exam.subject]) {
          subjects[exam.subject] = { total: 0, count: 0 };
        }
        subjects[exam.subject].total += (exam.marks / exam.total) * 100;
        subjects[exam.subject].count += 1;
      });
    });
    
    const avgMarks = {};
    Object.keys(subjects).forEach(subject => {
      avgMarks[subject] = subjects[subject].total / subjects[subject].count;
    });
    
    return { avgAttendance, avgMarks };
  };
  
  const classStats = calculateClassStats();

  // Render student details
  const renderStudentDetails = () => {
    if (!selectedStudent) return null;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
          <button 
            onClick={() => setSelectedStudent(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <p><span className="font-medium">Email:</span> {selectedStudent.email}</p>
            <p><span className="font-medium">Phone:</span> {selectedStudent.phone}</p>
            <p><span className="font-medium">Parent Contact:</span> {selectedStudent.parentContact}</p>
            <p><span className="font-medium">Grade:</span> {selectedStudent.grade}</p>
            <p><span className="font-medium">Attendance:</span> {selectedStudent.attendance}%</p>
          </div>
          
          {/* Documents */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-3">Documents</h3>
            {selectedStudent.documents.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {selectedStudent.documents.map(doc => (
                  <li key={doc.id} className="py-2">
                    <div className="flex justify-between">
                      <span>{doc.name}</span>
                      <span className="text-gray-500 text-sm">{doc.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No documents available</p>
            )}
          </div>
        </div>
        
        {/* Exam Results */}
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-3">Exam Results</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Subject</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Marks</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Percentage</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {selectedStudent.examMarks.map((exam, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2 text-sm">{exam.subject}</td>
                    <td className="px-4 py-2 text-sm">{exam.marks}/{exam.total}</td>
                    <td className="px-4 py-2 text-sm">
                      {Math.round((exam.marks / exam.total) * 100)}%
                    </td>
                    <td className="px-4 py-2 text-sm">{exam.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Teacher Dashboard</h1>
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('overview')}
        >
          Class Overview
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'students' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('students')}
        >
          Student List
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">Loading student data...</p>
        </div>
      ) : (
        <>
          {activeTab === 'overview' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Class Stats */}
              <div className="bg-white p-6 rounded-lg shadow-md col-span-1">
                <h2 className="text-xl font-bold mb-4">Class Statistics</h2>
                <p className="mb-2"><span className="font-medium">Total Students:</span> {students.length}</p>
                <p className="mb-4"><span className="font-medium">Average Attendance:</span> {classStats.avgAttendance.toFixed(1)}%</p>
                
                <h3 className="text-lg font-semibold mb-2">Subject Performance</h3>
                <ul className="space-y-2">
                  {Object.entries(classStats.avgMarks).map(([subject, avg]) => (
                    <li key={subject} className="flex justify-between">
                      <span>{subject}</span>
                      <span className="font-medium">{avg.toFixed(1)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Recent Activity - Placeholder */}
              <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <ul className="divide-y divide-gray-200">
                  <li className="py-3">Science test results uploaded - Apr 15, 2025</li>
                  <li className="py-3">Parent-teacher conference scheduled - Apr 10, 2025</li>
                  <li className="py-3">Mathematics assignment due date extended - Apr 8, 2025</li>
                  <li className="py-3">New document submitted by Alex Johnson - Apr 5, 2025</li>
                  <li className="py-3">Attendance report generated - Apr 1, 2025</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="mb-8">
              {/* Search */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search students by name..."
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Student List */}
              {selectedStudent ? (
                renderStudentDetails()
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map(student => {
                        // Calculate average score
                        const totalScore = student.examMarks.reduce((sum, exam) => sum + (exam.marks / exam.total), 0);
                        const avgScore = (totalScore / student.examMarks.length) * 100;
                        
                        return (
                          <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.grade}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.attendance}%</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.documents.length}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                avgScore >= 90 ? 'bg-green-100 text-green-800' :
                                avgScore >= 80 ? 'bg-blue-100 text-blue-800' :
                                avgScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {avgScore.toFixed(1)}%
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => setSelectedStudent(student)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;