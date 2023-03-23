import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  // addjust textarea height to fit content
  const adjustHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question) return;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-002/completions',
        {
          prompt: `Question: ${question}\nAnswer:`,
          max_tokens: 200,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      const aiAnswer = response.data.choices[0].text;
      setAnswer(aiAnswer);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img className="chat-img" src="https://miro.medium.com/max/640/1*bf37-lAuwi6_Wx5-e5EJ1Q.jpeg" alt="ChatGPT Logo" />
        <br />
        <h1>Chat</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="input-search"
            type="text"
            placeholder="Ask a question..."
            onChange={handleQuestionChange}
            value={question}
          />
          <br />
          <button className="btn-search" type="submit">
            Ask
          </button>
        </form>
        {/* insert horizontal line */}
        <hr />
        <br />
        <div className="alert alert-success" role="alert">
          {answer ? 'Question sent to the chat gpt api' : ''}
        </div>
        <br />
        {answer && (
          <div className="ans">
            <textarea
           className="form-control"
           id="exampleFormControlTextarea1"
           rows="3"
           readOnly
           placeholder="Answer from the chat gpt api"
           value={answer}
            onChange={adjustHeight}
         ></textarea>
       </div>
     )}
     <br />
   </header>
   {/* sent footer to the bottom */}
    <div className="push">
      
    </div>

    
   <footer>
     <p>© 2023 University of South Dakota</p>
     <p>414 East Clark Street Vermillion, SD 57069</p>
     <p>Andrés B. Aldaz</p>
     <br />
     <p>
       <a href="mailto:daibeal@icloud.com">daibeal@icloud.com</a>
     </p>
   </footer>

 </div>
);
}

export default App;  
     