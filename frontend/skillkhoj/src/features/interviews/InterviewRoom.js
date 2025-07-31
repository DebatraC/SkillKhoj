import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const InterviewRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [interview, setInterview] = useState(null);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterview = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockInterview = {
          id: parseInt(id),
          title: 'Frontend Developer Interview',
          company: 'TechCorp Inc.',
          interviewer: 'Sarah Wilson',
          candidate: 'John Doe',
          position: 'Senior React Developer',
          duration: 60,
          startTime: new Date().toISOString()
        };
        
        setInterview(mockInterview);
        
        // Mock initial chat messages
        setChatMessages([
          { id: 1, sender: 'Sarah Wilson', message: 'Welcome to the interview!', time: '10:00 AM' },
          { id: 2, sender: 'John Doe', message: 'Thank you, happy to be here!', time: '10:01 AM' }
        ]);
      } catch (error) {
        console.error('Error fetching interview:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterview();
  }, [id]);

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleAudio = () => setIsAudioOn(!isAudioOn);
  const toggleScreenShare = () => setIsScreenSharing(!isScreenSharing);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: chatMessages.length + 1,
        sender: user?.firstName + ' ' + user?.lastName,
        message: newMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const endInterview = () => {
    if (window.confirm('Are you sure you want to end the interview?')) {
      navigate('/interviews');
    }
  };

  if (isLoading) {
    return <Loading text="Joining interview room..." />;
  }

  if (!interview) {
    return <div>Interview not found</div>;
  }

  return (
    <div className="interview-room">
      {/* Header */}
      <div className="room-header">
        <h2>{interview.title}</h2>
        <div className="interview-info">
          <span>{interview.company} - {interview.position}</span>
          <span>Duration: {interview.duration} minutes</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="room-content">
        {/* Video Area */}
        <div className="video-area">
          <div className="video-grid">
            <div className="video-participant">
              <div className="video-placeholder">
                {isVideoOn ? '📹' : '📹❌'}
                <span>{interview.interviewer}</span>
              </div>
            </div>
            <div className="video-participant">
              <div className="video-placeholder">
                {isVideoOn ? '📹' : '📹❌'}
                <span>{interview.candidate}</span>
              </div>
            </div>
          </div>

          {/* Screen Share */}
          {isScreenSharing && (
            <div className="screen-share">
              <div className="screen-placeholder">
                🖥️ Screen Sharing Active
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="video-controls">
            <Button 
              variant={isAudioOn ? 'primary' : 'danger'} 
              size="small"
              onClick={toggleAudio}
            >
              {isAudioOn ? '🎤' : '🎤❌'}
            </Button>
            <Button 
              variant={isVideoOn ? 'primary' : 'danger'} 
              size="small"
              onClick={toggleVideo}
            >
              {isVideoOn ? '📹' : '📹❌'}
            </Button>
            <Button 
              variant={isScreenSharing ? 'success' : 'outline'} 
              size="small"
              onClick={toggleScreenShare}
            >
              🖥️ Share
            </Button>
            <Button variant="danger" size="small" onClick={endInterview}>
              📞 End
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="room-sidebar">
          {/* Participants */}
          <Card className="participants-panel">
            <h4>Participants</h4>
            <div className="participants-list">
              <div className="participant">
                <span>👤 {interview.interviewer}</span>
                <span className="role">Interviewer</span>
              </div>
              <div className="participant">
                <span>👤 {interview.candidate}</span>
                <span className="role">Candidate</span>
              </div>
            </div>
          </Card>

          {/* Chat */}
          <Card className="chat-panel">
            <h4>Chat</h4>
            <div className="chat-messages">
              {chatMessages.map(msg => (
                <div key={msg.id} className="chat-message">
                  <div className="message-header">
                    <span className="sender">{msg.sender}</span>
                    <span className="time">{msg.time}</span>
                  </div>
                  <div className="message-content">{msg.message}</div>
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button size="small" onClick={sendMessage}>Send</Button>
            </div>
          </Card>

          {/* Notes */}
          <Card className="notes-panel">
            <h4>Notes</h4>
            <textarea
              placeholder="Take notes during the interview..."
              rows="6"
              className="notes-textarea"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewRoom;