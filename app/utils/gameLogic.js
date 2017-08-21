
function calcuScore(board, stepCount, ai){
  const result = calculateWinner(board);
  if(result === 'draw'){
    return 0;
  }else if(result === ai){
    return 10 - stepCount;
  }else{
    return -10 + stepCount
  }
}

export function computeNextStep(board, player, ai){
  const steps = availableSteps(board);
  let perfectStep = steps[0];
  let perfectScore = Number.MIN_SAFE_INTEGER;
  steps.forEach(s => {
    const score = weightStep(s, board, player, 1, ai);
    if(score > perfectScore){
      perfectScore = score;
      perfectStep = s;
    }
  });
  return perfectStep;
}

function availableSteps(board){
  return board.reduce((pre, cur, i) => {
    if(!cur){
      pre.push(i);
    }
    return pre;
  }, []);
}

export function reverPlayer(player){
  return player === 'X' ? 'O' : 'X';
}

function weightStep(step, board, player, stepCount, ai){
  const temp = board[step];
  board[step] = player;
  const result = calculateWinner(board);
  if(result){
    const score = calcuScore(board, stepCount, ai);
    board[step] = temp;
    return score;
  }else{
    let scoreList = [];
    let steps = availableSteps(board);
    for(let s of steps){
      scoreList.push(weightStep(s, board, reverPlayer(player), stepCount + 1, ai));
    }
    board[step] = temp;
    if(ai === player){
      return Math.min(...scoreList);
    }else{
      return Math.max(...scoreList);
    }
  }
}

export function calculateWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (board[a] && board[a] === board[c] && board[a] === board[b]) {
      return board[a];
    }
  }
  return board.some(s => s === null) ? null : 'draw';
}


