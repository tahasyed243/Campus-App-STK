import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '@/utils/constant';
import { ref, get } from 'firebase/database';
import { useSelector } from 'react-redux';
import {
    Briefcase,
    Users,
    FileText,
    Bell,
    MessageSquare,
    Search,
    TrendingUp,
    Calendar,
    Award,
    Building,
    MapPin,
    DollarSign,
    Clock,
    ChevronRight,
    UserCircle,
    BarChart3,
    Filter
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Dashboard = () => {
    const { user } = useSelector((store) => store.auth);
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalJobs: 0,
        applications: 0,
        interviews: 0,
        profileViews: 0
    });

    const [recentJobs, setRecentJobs] = useState([]);
    const [upcomingInterviews, setUpcomingInterviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetchDashboardData();
    }, [user, navigate]);

    const fetchDashboardData = async () => {
        try {
            // Fetch user's applications
            const applicationsRef = ref(db, `users/${user.uid}/applications`);
            const applicationsSnapshot = await get(applicationsRef);
            const applications = applicationsSnapshot.val() || {};

            // Fetch all jobs to get recent ones
            const jobsRef = ref(db, 'jobs');
            const jobsSnapshot = await get(jobsRef);
            const allJobs = jobsSnapshot.val() || {};

            // Calculate stats
            const applicationCount = Object.keys(applications).length;
            const interviewCount = Object.values(applications).filter(app =>
                app.status === 'Interview Scheduled' || app.status === 'Accepted'
            ).length;

            // Get recent jobs (last 5)
            const jobArray = Object.entries(allJobs)
                .map(([id, data]) => ({ id, ...data }))
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);

            // Mock upcoming interviews (you can replace with real data)
            const mockInterviews = [
                { id: 1, company: 'Google', position: 'Frontend Developer', date: '2024-01-20T10:00', type: 'Technical' },
                { id: 2, company: 'Microsoft', position: 'Software Engineer', date: '2024-01-22T14:30', type: 'HR' },
            ];

            setStats({
                totalJobs: Object.keys(allJobs).length,
                applications: applicationCount,
                interviews: interviewCount,
                profileViews: Math.floor(Math.random() * 100) + 50 // Mock data
            });

            setRecentJobs(jobArray);
            setUpcomingInterviews(mockInterviews);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {user?.fullname || 'User'}!</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 md:max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search jobs, companies, or skills..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                                <Bell className="h-6 w-6 text-gray-600" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>

                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <MessageSquare className="h-6 w-6 text-gray-600" />
                            </button>

                            <Avatar className="h-9 w-9 cursor-pointer">
                                <AvatarImage src={user?.photoURL} />
                                <AvatarFallback>
                                    {user?.fullname?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-blue-700 font-medium">Total Jobs</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalJobs}</h3>
                                        </div>
                                        <Briefcase className="h-8 w-8 text-blue-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-green-700 font-medium">Applications</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.applications}</h3>
                                        </div>
                                        <FileText className="h-8 w-8 text-green-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-purple-700 font-medium">Interviews</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.interviews}</h3>
                                        </div>
                                        <Calendar className="h-8 w-8 text-purple-600" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-orange-700 font-medium">Profile Views</p>
                                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.profileViews}</h3>
                                        </div>
                                        <Users className="h-8 w-8 text-orange-600" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Job Opportunities */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-purple-600" />
                                        Recent Job Opportunities
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" className="text-purple-600">
                                        See all <ChevronRight className="ml-1 h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentJobs.map((job) => (
                                        <div
                                            key={job.id}
                                            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                            onClick={() => navigate(`/description/${job.id}`)}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="bg-gray-100 p-2 rounded-lg">
                                                            <Building className="h-5 w-5 text-gray-600" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-gray-900">{job.title}</h4>
                                                            <p className="text-sm text-gray-600">{job.companyName}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                                            <MapPin className="h-4 w-4" />
                                                            <span>{job.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                                            <Clock className="h-4 w-4" />
                                                            <span>{job.jobType}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-sm text-gray-600">
                                                            <DollarSign className="h-4 w-4" />
                                                            <span>{job.salary}</span>
                                                        </div>
                                                        <Badge variant="outline" className="text-xs">
                                                            {job.position} positions
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Application Status */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-purple-600" />
                                    Your Application Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Software Engineer</p>
                                            <p className="text-sm text-gray-600">Google • Applied 2 days ago</p>
                                        </div>
                                        <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Frontend Developer</p>
                                            <p className="text-sm text-gray-600">Microsoft • Applied 1 week ago</p>
                                        </div>
                                        <Badge className="bg-green-100 text-green-800">Interview Scheduled</Badge>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">Product Manager</p>
                                            <p className="text-sm text-gray-600">Amazon • Applied 3 days ago</p>
                                        </div>
                                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Profile Completion */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Profile Completion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium">75% Complete</span>
                                            <span className="text-sm text-gray-600">75/100</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full w-3/4"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Resume Upload</span>
                                            <Badge className="bg-green-100 text-green-800">✓ Done</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Skills</span>
                                            <Badge className="bg-yellow-100 text-yellow-800">Update</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Education</span>
                                            <Badge className="bg-green-100 text-green-800">✓ Done</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm">Experience</span>
                                            <Badge className="bg-red-100 text-red-800">Add</Badge>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                        Complete Your Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Upcoming Interviews */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                    Upcoming Interviews
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {upcomingInterviews.map((interview) => (
                                        <div key={interview.id} className="p-3 border rounded-lg">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h4 className="font-semibold">{interview.position}</h4>
                                                    <p className="text-sm text-gray-600">{interview.company}</p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {interview.type}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(interview.date).toLocaleDateString()} •
                                                            {new Date(interview.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline">
                                                    Join
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="flex flex-col h-auto py-4">
                                        <FileText className="h-6 w-6 mb-2 text-purple-600" />
                                        <span className="text-sm">Update Resume</span>
                                    </Button>

                                    <Button variant="outline" className="flex flex-col h-auto py-4">
                                        <Search className="h-6 w-6 mb-2 text-blue-600" />
                                        <span className="text-sm">Find Jobs</span>
                                    </Button>

                                    <Button variant="outline" className="flex flex-col h-auto py-4">
                                        <Award className="h-6 w-6 mb-2 text-green-600" />
                                        <span className="text-sm">Skills Test</span>
                                    </Button>

                                    <Button variant="outline" className="flex flex-col h-auto py-4">
                                        <Users className="h-6 w-6 mb-2 text-orange-600" />
                                        <span className="text-sm">Network</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Suggested Companies */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Suggested Companies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {['Google', 'Microsoft', 'Amazon', 'Meta'].map((company) => (
                                        <div key={company} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-gray-100 p-2 rounded">
                                                    <Building className="h-5 w-5 text-gray-600" />
                                                </div>
                                                <span className="font-medium">{company}</span>
                                            </div>
                                            <Button size="sm" variant="ghost">Follow</Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;