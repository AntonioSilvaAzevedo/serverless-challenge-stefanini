import { request, response, Router } from 'express'

import EmployeeController from './controllers/EmployeeController'

const router = Router()

router.get('/', (request, response) => {
  return response.json({ message: 'Server online' })
})

router.post('/employee', EmployeeController.CreateEmployee)
router.get('/employees', EmployeeController.findAllEmployees)
router.get('/employee/:id', EmployeeController.findEmployee)
router.put('/employee/:id', EmployeeController.updateEmployee)
router.delete('/employee/:id', EmployeeController.deleEmployee)

export { router }
