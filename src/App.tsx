import './App.css'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'


function App() {

  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [confirmPassword,setConfirmPassword] = useState<string>("")
  const [accountCard, setAccountCard] = useState<boolean>(true)
  const [profileCard,setProfileCard] = useState<boolean>(false)
  const [reviewCard,setReviewCard] = useState<boolean>(false)
  const [sucessCard, setSuccessCard] = useState<boolean>(false)
  const [fullName, setFullName] = useState<string>("")
  const [dateOfBirth,setDateOfBirth] = useState<string>("")
  const [phoneNumber,setPhoneNumber] = useState<string>("")
  const [country,setCountry] = useState<string>("")
  const [city,setCity] = useState<string>("")
  const [edit,setEdit] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(false)
  const [currentStep,setCurrentStep] = useState<number>(0)

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  const handleAccount = () => {
    if(!email.trim()){
      return toast.error("Please enter the email Id")
    }
    if (!validateEmail(email)){
      return toast.error("Please enter a valid email Id")
    }
    if (password.length < 8){
      return toast.error("Password length should at be least 8 characters long")
    }
    if (password !== confirmPassword){
      return toast.error("Password and Confirm Password should be the same")
    }
    if(edit){
      setReviewCard(true)
      setAccountCard(false)
      setCurrentStep(2)
      toast.success("Account details have been updated !")
    } else {
      toast.success("Account details have been saved !")
      setProfileCard(true)
      setAccountCard(false)
      setCurrentStep(1)
    }
    setEdit(false)
  }


  const handleProfile = () => {
    if(!fullName){
      return toast.error("Please enter the Full Name")
    }
    if(!dateOfBirth){
      return toast.error("Please enter the Date of Birth")
    }
    if(!phoneNumber){
      return toast.error("Please enter the Phone Number")
    }
    if(!country){
      return toast.error("Please enter the Country")
    }
    if(!city){
      return toast.error("Please enter the City")
    }
    toast.success("All Details saved")
    setProfileCard(false)
    setReviewCard(true)
    setCurrentStep(2)
  }


  const handleAccountEdit = () => {
    setEdit(true)
    setAccountCard(true)
    setReviewCard(false)
    setEmail(email)
    setPassword(password)
    setConfirmPassword(password)
    setCurrentStep(0)
  }


  const handleProfileEdit = () => {
    setEdit(true)
    setProfileCard(true)
    setReviewCard(false)
    setFullName(fullName)
    setDateOfBirth(dateOfBirth)
    setPhoneNumber(phoneNumber)
    setCountry(country)
    setCity(city)
    setCurrentStep(1)
  }


  const handleSubmit = async () => {
    setLoading(true)
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve()
        }, 2000);
      })
      setReviewCard(false)
      setSuccessCard(true)
    toast.success("Account created sucessfully")
    }
    catch(error) {
      toast.error("Something went wrong!")
    }
    finally{
      setLoading(false)
      setCurrentStep(-1)
    }  
  }

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-10 select-none">
        <header>
        <h1 className="text-3xl sm:text-4xl font-bold mt-6 sm:mt-10 text-center">Multi-Step Signup</h1>
        </header>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-10">
          {
            ["Account","Profile","Review"].map((step,index) => (
              <h3 className={`text-base sm:text-xl md:text-2xl font-semibold p-2 sm:p-3 rounded-full
              ${ currentStep === index ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}>{step}</h3>
            ))
          }
        </div>

        { accountCard &&
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 w-full max-w-2xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold">
            {edit ? "Update your Account" : "Create your Account"}
          </h3>
          <p className='mt-4'>Let's start with your account details</p>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-5 mt-5'>
          <label className='text-base sm:text-lg md:text-xl font-semibold sm:mt-1 text-left sm:text-right'>Email Address :</label>
          <input
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          type="text"
          placeholder="Enter your email Id"
          className="border rounded-lg p-2 w-full sm:w-1/2 min-w-0"
          />
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-5 mt-5'>
          <label className='text-base sm:text-lg md:text-xl font-semibold sm:mt-1 text-left sm:text-right'>Password :</label>
          <input
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          type="password"
          placeholder="Enter your password"
          className="border rounded-lg p-2 w-full sm:w-1/2 min-w-0"
          />
          {password && (
          <div className="mt-2">
          <div className="h-2 w-full rounded-full bg-gray-200">
          <div
              className={`h-2 rounded-full ${
                password.length < 6
                  ? "w-1/3 bg-red-500"
                  : password.length < 10
                  ? "w-2/3 bg-yellow-500"
                  : "w-full bg-green-500"
                  }`}
                ></div>
              </div>

              <p className="mt-1 text-sm">
                {password.length < 6
                  ? "Weak"
                  : password.length < 10
                  ? "Medium"
                  : "Strong"}
              </p>
            </div>
              )}
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-5 mt-5'>
          <label className='text-base sm:text-lg md:text-xl font-semibold sm:mt-1 text-left sm:text-right'>Confirm Password :</label>
          <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Enter your confirm password"
          className="border rounded-lg p-2 w-full sm:w-1/2 min-w-0"
          />
          </div>
          <button onClick={() => handleAccount()} className="bg-blue-500 text-white px-5 py-2 rounded-full mt-5">
          {edit ? "Update" : "Next"}
          </button>
        </div>
        }

        {
          profileCard &&
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 w-full max-w-2xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold">
            Your Profile
          </h3>
          <p className='mt-4'>Tell us a little about yourself</p>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-5 mt-5'>
          <label className='text-base sm:text-lg md:text-xl font-semibold sm:mt-1 text-left sm:text-right'>Full Name :</label>
          <input
          value={fullName}
          onChange={(e)=> setFullName(e.target.value)}
          type="text"
          placeholder="Enter your Full Name"
          className="border rounded-lg p-2 w-full sm:w-1/2 min-w-0"
          />
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-5 mt-5'>
          <label className='text-base sm:text-lg md:text-xl font-semibold sm:mt-1 text-left sm:text-right'>Date of Birth :</label>
          <input
          value={dateOfBirth}
          onChange={(e)=> setDateOfBirth(e.target.value)}
          type="date"
          placeholder="Enter your password"
          className="border rounded-lg p-2 w-full sm:w-1/2 min-w-0"
          />
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-5 mt-5'>
          <label className='text-base sm:text-lg md:text-xl font-semibold sm:mt-1 text-left sm:text-right'>Phone Number :</label>
          <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="text"
          placeholder="Enter your Phone Number"
          className="border rounded-lg p-2 w-full sm:w-1/2 min-w-0"
          />
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-5 mt-5'>
          <label className='text-base sm:text-lg md:text-xl font-semibold sm:mt-1 text-left sm:text-right'>Country :</label>
          <input
          value={country}
          onChange={(e)=> setCountry(e.target.value)}
          type="text"
          placeholder="Enter your Country"
          className="border rounded-lg p-2 w-full sm:w-1/2 min-w-0"
          />
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-5 mt-5'>
          <label className='text-base sm:text-lg md:text-xl font-semibold sm:mt-1 text-left sm:text-right'>City :</label>
          <input
          value={city}
          onChange={(e)=> setCity(e.target.value)}
          type="text"
          placeholder="Enter your City"
          className="border rounded-lg p-2 w-full sm:w-1/2 min-w-0"
          />
          </div>
          <button onClick={() => handleProfile()} className="bg-blue-500 text-white px-5 py-2 rounded-full mt-5">
          {edit ? "Update" : "Next"}
          </button>
        </div>
        }

        {
          reviewCard &&
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 w-full max-w-2xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold">
            Review Your Information
          </h3>
          <p className='mt-4'>Please check your details before submitting</p>
          <div className='flex justify-between'>
          <p className='font-semibold text-lg sm:text-xl md:text-2xl mt-5'>Account Details</p>
          <button onClick={() => handleAccountEdit()} className="bg-blue-500 text-white px-5 py-2 rounded-full mt-5">
          Edit
          </button>
          </div>
          <div className="flex flex-col gap-1 border-b pb-3">
          <p className="text-sm text-gray-500">Email Address</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">
          {email}
          </p>
          </div>
          <div className="flex flex-col gap-1 border-b pb-3 mt-5">
          <p className="text-sm text-gray-500">Password</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">
          {password ? "\*\*\*\*\*\*\*\*" : ""}
          </p>
          </div>
          <div className='flex justify-between'>
          <p className='font-semibold text-lg sm:text-xl md:text-2xl mt-5'>Profile Details</p>
          <button onClick={() => handleProfileEdit()} className="bg-blue-500 text-white px-5 py-2 rounded-full mt-5">
          Edit
          </button>
          </div>
          <div className="flex flex-col gap-1 border-b pb-3">
          <p className="text-sm text-gray-500">Full Name</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">
          {fullName}
          </p>
          </div>
          <div className="flex flex-col gap-1 border-b pb-3 mt-5">
          <p className="text-sm text-gray-500">Date of Birth</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">
          {dateOfBirth.split("-").reverse().join("-")}
          </p>
          </div>
          <div className="flex flex-col gap-1 border-b pb-3 mt-5">
          <p className="text-sm text-gray-500">Phone Number</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">
          {phoneNumber}
          </p>
          </div>
          <div className="flex flex-col gap-1 border-b pb-3 mt-5">
          <p className="text-sm text-gray-500">Country</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">
          {country}
          </p>
          </div>
          <div className="flex flex-col gap-1 border-b pb-3 mt-5">
          <p className="text-sm text-gray-500">City</p>
          <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">
          {city}
          </p>
          </div>
          <button onClick={() => handleSubmit()} className="bg-blue-500 text-white px-5 py-2 rounded-full mt-5">
          Submit
          </button>
        </div>
        }

        {
          loading &&
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      <h2 className="mt-6 text-xl font-bold text-gray-800">
        Creating Your Account
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Please wait while we process your information...
      </p>
    </div>
        }

        {
          sucessCard &&
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 w-full max-w-2xl text-center">
            <h3 className="text-xl sm:text-2xl font-semibold">Account Created Successfully</h3>
            <h2 className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-10">Welcome {fullName}</h2>
            <p className='text-lg sm:text-2xl mt-6 sm:mt-10'>Your account has been created and you can now log in to get started</p>
          </div>
        }
      </div>
    </div>
    </>
  )
}
export default App
