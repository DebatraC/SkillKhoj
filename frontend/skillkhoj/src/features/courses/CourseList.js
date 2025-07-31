import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';
import CourseCard from './CourseCard';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['all', 'web-development', 'mobile', 'data-science', 'devops', 'design'];

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCourses = [
          {
            id: 1,
            title: 'React Fundamentals',
            description: 'Learn the basics of React including components, state, and props.',
            instructor: 'John Doe',
            category: 'web-development',
            price: 99,
            rating: 4.8,
            students: 1250,
            duration: '8 weeks',
            level: 'Beginner',
            image: 'https://via.placeholder.com/300x200?text=React+Course'
          },
          {
            id: 2,
            title: 'Advanced JavaScript',
            description: 'Master advanced JavaScript concepts and modern ES6+ features.',
            instructor: 'Jane Smith',
            category: 'web-development',
            price: 129,
            rating: 4.9,
            students: 980,
            duration: '10 weeks',
            level: 'Advanced',
            image: 'https://via.placeholder.com/300x200?text=JavaScript+Course'
          },
          {
            id: 3,
            title: 'React Native Mobile Apps',
            description: 'Build cross-platform mobile apps with React Native.',
            instructor: 'Mike Johnson',
            category: 'mobile',
            price: 149,
            rating: 4.7,
            students: 750,
            duration: '12 weeks',
            level: 'Intermediate',
            image: 'https://via.placeholder.com/300x200?text=React+Native'
          },
          {
            id: 4,
            title: 'Data Science with Python',
            description: 'Learn data analysis, visualization, and machine learning.',
            instructor: 'Sarah Wilson',
            category: 'data-science',
            price: 199,
            rating: 4.9,
            students: 1100,
            duration: '16 weeks',
            level: 'Intermediate',
            image: 'https://via.placeholder.com/300x200?text=Data+Science'
          },
          {
            id: 5,
            title: 'DevOps with Docker & Kubernetes',
            description: 'Master containerization and orchestration.',
            instructor: 'David Brown',
            category: 'devops',
            price: 179,
            rating: 4.6,
            students: 650,
            duration: '14 weeks',
            level: 'Advanced',
            image: 'https://via.placeholder.com/300x200?text=DevOps'
          },
          {
            id: 6,
            title: 'UI/UX Design Principles',
            description: 'Learn design thinking and create beautiful user interfaces.',
            instructor: 'Emily Davis',
            category: 'design',
            price: 119,
            rating: 4.8,
            students: 890,
            duration: '6 weeks',
            level: 'Beginner',
            image: 'https://via.placeholder.com/300x200?text=UI+UX+Design'
          }
        ];
        
        setCourses(mockCourses);
        setFilteredCourses(mockCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);
  }, [courses, selectedCategory, searchTerm]);

  if (isLoading) {
    return <Loading text="Loading courses..." />;
  }

  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>Explore Courses</h1>
        <p>Discover thousands of courses taught by expert instructors</p>
      </div>

      {/* Filters */}
      <div className="courses-filters">
        <div className="search-filter">
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="mobile">Mobile Development</option>
            <option value="data-science">Data Science</option>
            <option value="devops">DevOps</option>
            <option value="design">Design</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="courses-results">
        <p>{filteredCourses.length} courses found</p>
      </div>

      {/* Courses Grid */}
      <div className="courses-grid">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="no-results">
          <h3>No courses found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;