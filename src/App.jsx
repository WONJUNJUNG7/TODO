import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // localStorage에서 데이터 로드
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    }
  }, []);

  // todos 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-2">
            할 일 목록
          </h1>
          <p className="text-blue-600 text-sm sm:text-base">
            오늘 해야 할 일을 관리하세요
          </p>
        </div>

        {/* 입력 영역 */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="할 일을 입력하세요..."
              className="flex-1 px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50 text-gray-800 placeholder-gray-500"
            />
            <button
              onClick={addTodo}
              className="w-full sm:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 transform hover:scale-105 active:scale-95"
            >
              추가
            </button>
          </div>
        </div>

        {/* 할 일 목록 */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {todos.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <p className="text-lg">아직 할 일이 없습니다.</p>
              <p className="text-sm mt-2">위에서 할 일을 추가해보세요!</p>
            </div>
          ) : (
            <ul className="divide-y divide-blue-100">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="p-4 sm:p-5 hover:bg-blue-50 transition-colors duration-150 flex items-center gap-3 sm:gap-4 group"
                >
                  {/* 체크박스 */}
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 bg-blue-100 border-blue-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                  />

                  {/* 텍스트 */}
                  <span
                    className={`flex-1 text-sm sm:text-base transition-all duration-200 ${
                      todo.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.text}
                  </span>

                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150 flex-shrink-0 opacity-0 sm:opacity-100 group-hover:opacity-100"
                    aria-label="삭제"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 통계 */}
        {todos.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-gray-600 text-sm font-medium">전체</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {todos.length}
                </p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-gray-600 text-sm font-medium">완료</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">
                  {todos.filter((t) => t.completed).length}
                </p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg col-span-2 sm:col-span-1">
                <p className="text-gray-600 text-sm font-medium">남음</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                  {todos.filter((t) => !t.completed).length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
