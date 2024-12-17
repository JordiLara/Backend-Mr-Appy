export function allAccess(req, res) {
  res.status(200).json({
    code: 1,
    message: 'Public Content.'
  });
}

export function userBoard(req, res) {
  res.status(200).json({
    code: 1,
    message: 'User Content.'
  });
}

export function adminBoard(req, res) {
  res.status(200).json({
    code: 1,
    message: 'Admin Content.'
  });
}

export function moderatorBoard(req, res) {
  res.status(200).json({
    code: 1,
    message: 'Moderator Content.'
  });
}