"use server"


export const getUser = async() => {
  const token = await localStorage.getItem("token");
  if(token) return token
}

export const logout = async() => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("user")
}
