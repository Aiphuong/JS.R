// Test script cho Hero API
const testHeroApi = async () => {
	try {
		console.log('Testing Hero API...')
		
		// Test GET
		console.log('\n1. Testing GET /api/admin/hero')
		const getResponse = await fetch('http://localhost:3000/api/admin/hero')
		const getData = await getResponse.json()
		console.log('GET Response:', getData)
		
		// Test POST
		console.log('\n2. Testing POST /api/admin/hero')
		const postData = {
			title: 'Test Hero Title',
			subtitle: 'Test Subtitle',
			description: 'Test description for hero section'
		}
		
		const postResponse = await fetch('http://localhost:3000/api/admin/hero', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(postData)
		})
		
		const postResult = await postResponse.json()
		console.log('POST Response:', postResult)
		console.log('POST Status:', postResponse.status)
		
	} catch (error) {
		console.error('Test failed:', error)
	}
}

// Chạy test nếu script được chạy trực tiếp
if (typeof window === 'undefined') {
	testHeroApi()
} 