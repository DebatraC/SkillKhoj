import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';
import JobCard from './JobCard';

const JobList = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const locations = ['all', 'Remote', 'San Francisco', 'New York', 'Seattle', 'Austin', 'Boston'];
  const jobTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Internship'];
  const experienceLevels = ['all', 'Entry Level', 'Mid Level', 'Senior Level', 'Lead/Principal'];

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockJobs = [
          {
            id: 1,
            title: 'Senior React Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            level: 'Senior Level',
            salary: '$120k - $150k',
            description: 'We are looking for a Senior React Developer to join our frontend team.',
            requirements: ['5+ years React experience', 'TypeScript', 'Next.js', 'GraphQL'],
            benefits: ['Health Insurance', 'Stock Options', 'Remote Work', '401k'],
            postedDate: '2025-07-28',
            companyLogo: 'https://ui-avatars.com/api/?name=TechCorp&background=007bff&color=fff',
            remote: false,
            featured: true
          },
          {
            id: 2,
            title: 'Full Stack Engineer',
            company: 'StartupXYZ',
            location: 'Remote',
            type: 'Full-time',
            level: 'Mid Level',
            salary: '$90k - $120k',
            description: 'Join our growing team and help build the next generation of web applications.',
            requirements: ['3+ years experience', 'React', 'Node.js', 'MongoDB'],
            benefits: ['Flexible Hours', 'Health Insurance', 'Learning Budget'],
            postedDate: '2025-07-26',
            companyLogo: 'https://ui-avatars.com/api/?name=StartupXYZ&background=28a745&color=fff',
            remote: true,
            featured: false
          },
          {
            id: 3,
            title: 'Frontend Developer Intern',
            company: 'BigTech Corp',
            location: 'Seattle, WA',
            type: 'Internship',
            level: 'Entry Level',
            salary: '$30/hour',
            description: 'Summer internship program for aspiring frontend developers.',
            requirements: ['CS degree or bootcamp', 'JavaScript', 'React basics'],
            benefits: ['Mentorship', 'Learning Opportunities', 'Networking'],
            postedDate: '2025-07-30',
            companyLogo: 'https://ui-avatars.com/api/?name=BigTech&background=dc3545&color=fff',
            remote: false,
            featured: false
          },
          {
            id: 4,
            title: 'Lead Frontend Architect',
            company: 'Enterprise Solutions',
            location: 'New York, NY',
            type: 'Full-time',
            level: 'Lead/Principal',
            salary: '$160k - $200k',
            description: 'Lead our frontend architecture and mentor a team of developers.',
            requirements: ['8+ years experience', 'Team leadership', 'Architecture design'],
            benefits: ['Equity', 'Premium Health', 'Education Budget', 'Sabbatical'],
            postedDate: '2025-07-25',
            companyLogo: 'https://ui-avatars.com/api/?name=Enterprise&background=ffc107&color=000',
            remote: false,
            featured: true
          },
          {
            id: 5,
            title: 'React Native Developer',
            company: 'MobileFirst Inc.',
            location: 'Austin, TX',
            type: 'Contract',
            level: 'Mid Level',
            salary: '$80 - $100/hour',
            description: 'Contract position to develop mobile applications using React Native.',
            requirements: ['React Native', 'iOS/Android', 'JavaScript/TypeScript'],
            benefits: ['Flexible Schedule', 'High Hourly Rate'],
            postedDate: '2025-07-29',
            companyLogo: 'https://ui-avatars.com/api/?name=MobileFirst&background=6f42c1&color=fff',
            remote: true,
            featured: false
          }
        ];
        
        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => 
        job.location.includes(selectedLocation) || 
        (selectedLocation === 'Remote' && job.remote)
      );
    }
    
    // Filter by job type
    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType);
    }
    
    // Filter by experience level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(job => job.level === selectedLevel);
    }
    
    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedLocation, selectedType, selectedLevel]);

  if (isLoading) {
    return <Loading text="Loading job openings..." />;
  }

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Job Openings 💼</h1>
        <p>Find your next opportunity with top companies</p>
        {user?.role === 'recruiter' && (
          <Link to="/jobs/post">
            <Button>Post a Job</Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="jobs-filters">
        <div className="search-filter">
          <Input
            placeholder="Search jobs, companies, skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-row">
          <select 
            value={selectedLocation} 
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="filter-select"
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
          
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            {jobTypes.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </option>
            ))}
          </select>
          
          <select 
            value={selectedLevel} 
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="filter-select"
          >
            {experienceLevels.map(level => (
              <option key={level} value={level}>
                {level === 'all' ? 'All Levels' : level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="jobs-results">
        <p>{filteredJobs.length} jobs found</p>
      </div>

      {/* Featured Jobs */}
      {filteredJobs.some(job => job.featured) && (
        <div className="featured-jobs">
          <h2>Featured Jobs</h2>
          <div className="jobs-grid">
            {filteredJobs.filter(job => job.featured).map(job => (
              <JobCard key={job.id} job={job} featured />
            ))}
          </div>
        </div>
      )}

      {/* All Jobs */}
      <div className="all-jobs">
        {!filteredJobs.some(job => job.featured) ? null : <h2>All Jobs</h2>}
        <div className="jobs-grid">
          {filteredJobs.filter(job => !job.featured).map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      {filteredJobs.length === 0 && (
        <div className="no-results">
          <h3>No jobs found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default JobList;