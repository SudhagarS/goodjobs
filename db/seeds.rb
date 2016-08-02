jobs = [
  [ "Software Engineer", "F22", "http://www.f22.com", "This is amazing", "Chennai" ],
  [ "Software Engineer", "Google", "http://www.google.com", "Rails is top", "SF" ],
  [ "Software Tester", "Zoho", "http://www.zoho.com", "This is Hmm", "Chennai" ],
  [ "Content Writer", "Onion", "http://www.hello.com", "Proper description", "Mumbai" ],
  [ "Marketer", "FFF22", "http://www.f22.com", "This is amazing", "Mumbai" ],
]

jobs.each do |title, company_name, company_home_page, description, location|
  Job.create(
    title: title, 
    company_name: company_name, 
    company_home_page: company_home_page,
    description: description,
    location: location
  )
end
