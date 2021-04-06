import { sendGet, sendPost } from "Shared/utils/request"
import { CompanyMapper } from "./CompanyMapper"

async function getCompanyByOwner(ownerId) {
  let rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/company/info-owner"
  const params = { owner: ownerId }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { status, data, message, error } = result

      rData = status ? CompanyMapper(data) : null
      rMessage = message
      rError = error
    })
    .catch(e => {     
      rError = e.message
    })

  return {
    data: rData,
    message: rMessage,
    error: rError
  }
}

async function saveCompany(ownerId, saveData) {
  let rSuccess = false, rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/company/save-owner"
  const bodyData = {
    owner: ownerId,
    ...saveData
  }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { status, data, message, error } = result

      rSuccess = status
      rData = status ? CompanyMapper(data) : null
      rMessage = message
      rError = error
    })
    .catch(e => {
      rError = e.message
    })

  return {
    success: rSuccess,
    data: rData,
    message: rMessage,
    error: rError
  }
}

export {
  saveCompany,
  getCompanyByOwner
}