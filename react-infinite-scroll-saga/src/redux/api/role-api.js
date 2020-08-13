import axios from "axios"

const defaultAxios = axios.create({
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImhpZ2hhZG1pbkBnbWFpbC5jb20iLCJFeHBpcmVzQXQiOjE1OTcyMjcxOTksIklzc3VlZEF0IjoxNTk3MjIzNTk5LCJOYW1lIjoiSGlnaCBBZG1pbiIsIlJvbGVOYW1lIjoiSGlnaCBBZG1pbiIsIlVzZXJJRCI6MX0.PmWldOwTKnw3Lwaud9xXM2t3mZrxDjNAYvyP4dZEOyc"
  }
})

export const getAllRoles = async (page) => {
  try {
    const roles = await defaultAxios.get(`api/v1/roles?page=${page}&limit=20`)

    return roles.data
  } catch (err) {
    return err
  }
}
