module.exports = {
  GET_USER_SLOT_SUCCESS: {
    code: 200,
    success: true,
    type: 'GET_USER_SLOT_SUCCESS',
    message: 'User slots retrieved successfully'
  },
  GET_USER_SLOT_FAILED: {
    code: 400,
    success: false,
    type: 'GET_USER_SLOT_FAILED',
    message: 'User slots retrieval failed'
  },
  BOOK_MEETING_SUCCESS: {
    code: 200,
    success: true,
    type: 'BOOK_MEETING_SUCCESS',
    message: 'Successfully booked meeting'

  },
  BOOK_MEETING_FAILED: {
    code: 400,
    success: false,
    type: 'BOOK_MEETING_FAILED',
    message: 'Failed to book meeting'
  }

};