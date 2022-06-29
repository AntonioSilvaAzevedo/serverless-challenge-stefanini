import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
  async CreateEmployee(req, res) {
    try {
      const { name, age, office } = req.body

      let employee = await prisma.employee.findUnique({ where: { name } })

      if (employee) {
        return res.json({ error: 'employee already registered' })
      }

      employee = await prisma.employee.create({
        data: {
          name,
          age,
          office
        }
      })

      return res.json(employee)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findAllEmployees(req, res) {
    try {
      const employees = await prisma.employee.findMany()
      return res.json(employees)
    } catch (error) {
      return res.json({ error })
    }
  },

  async findEmployee(req, res) {
    try {
      const { id } = req.params
      const employee = await prisma.employee.findUnique({
        where: { id: Number(id) }
      })

      if (!employee) return res.json({ error: 'non-existing employee' })
      return res.json(employee)
    } catch (error) {
      return res.json({ error })
    }
  },

  async updateEmployee(req, res) {
    try {
      const { id } = req.params
      const { name, age, office } = req.body

      let employee = await prisma.employee.findUnique({
        where: { id: Number(id) }
      })

      if (!employee) return res.json({ error: 'non-existing employee' })

      employee = await prisma.employee.update({
        where: { id: Number(id) },
        data: { name, age, office }
      })
      return res.json(employee)
    } catch (error) {
      return res.json({ error })
    }
  },

  async deleEmployee(req, res) {
    try {
      const { id } = req.params

      const employee = await prisma.employee.findUnique({
        where: { id: Number(id) }
      })

      if (!employee) return res.json({ message: 'non-existing employee' })

      await prisma.employee.delete({
        where: { id: Number(id) }
      })
      return res.json({ error: 'excluded employee' })
    } catch (error) {
      return res.json({ error })
    }
  }
}
