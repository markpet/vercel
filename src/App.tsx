import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

type Player = 'X' | 'O' | null;

interface Score {
  id: string;
  player: string;
  wins: number;
}

function App() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState<Score[]>([]);

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  useEffect(() => {
    const fetchScores = async () => {
      const { data } = await supabase
        .from('scores')
        .select('*')
        .order('wins', { ascending: false });
      setScores(data ?? []);
    };

    fetchScores();
  }, []);

  const updateScore = async (player: string) => {
    const { data } = await supabase
      .from('scores')
      .select('id, wins')
      .eq('player', player)
      .single();

    if (data) {
      await supabase
        .from('scores')
        .update({ wins: data.wins + 1 })
        .eq('id', data.id);
    } else {
      await supabase
        .from('scores')
        .insert({ player, wins: 1 });
    }

    const refreshed = await supabase
      .from('scores')
      .select('*')
      .order('wins', { ascending: false });

    setScores(refreshed.data ?? []);
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    if (winner) {
      updateScore(winner);
    }
  }, [winner]);

  const renderSquare = (index: number) => (
    <button
      key={index}
      className="w-20 h-20 border text-2xl"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1 mb-8">
        {board.map((_, i) => renderSquare(i))}
      </div>
      <div className="text-lg font-bold mb-2">Leaderboard</div>
      <ul>
        {scores.map((score) => (
          <li key={score.id}>{score.player}: {score.wins} win(s)</li>
        ))}
      </ul>
    </div>
  );
}

function calculateWinner(squares: Player[]): Player {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
