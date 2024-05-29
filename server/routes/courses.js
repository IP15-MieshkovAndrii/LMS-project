const courseController = require("../controllers/course.controller");

const Response = {
    type: 'object',
    properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
    }
}

const Error = {
    type: 'object',
    properties: {
      errorMessage: { type: 'string' }
    }
}

const uploadCourseOpts = {
    schema: {
      response: {
        200: Response,
        400: Error,
        500: Error
      },
    },
    handler: courseController.uploadCourse,
}

const editCourseOpts = {
    schema: {
      response: {
        200: Response,
        400: Error,
        500: Error
      },
    },
    handler: courseController.editCourse,
}

const getSingleCOpts = {
    schema: {
        response: {
            200: Response,
            400: Error,
            500: Error
        }
    },
    handler: courseController.getSingleCourse
}

const getAllCoursesOpts = {
    schema: {
        response: {
            200: Response,
            400: Error,
            500: Error
        }
    },
    handler: courseController.getAllCourses
}

const addQuestionOpts = {
    schema: {
      response: {
        200: Response,
        400: Error,
        500: Error
      },
    },
    handler: courseController.addQuestion,
}

const addAnswerOpts = {
    schema: {
      response: {
        200: Response,
        400: Error,
        500: Error
      },
    },
    handler: courseController.addAnswer,
}

const deleteCourseOpts = {
  schema: {
    response: {
      200: Response,
      400: Error,
      500: Error
    },
  },
  handler: courseController.deleteCourse,
}


function courseRoutes(fastify, options, done) {

    fastify.post('/api/create-course', uploadCourseOpts);

    fastify.put('/api/edit-course/:id', editCourseOpts);

    fastify.get('/api/get-single-course/:id', getSingleCOpts);

    fastify.get('/api/get-all-courses/:id', getAllCoursesOpts);

    fastify.put('/api/add-question', addQuestionOpts);

    fastify.put('/api/add-answer', addAnswerOpts);

    fastify.delete('/delete-course/:id', deleteCourseOpts); 


    done()
}
  
module.exports = courseRoutes;