const BASE_URL = 'http://localhost:5000/api';

async function testFlow() {
    console.log('--- Starting Backend Flow Test ---');

    const testUser = {
        name: 'Backend Test User',
        email: `test_${Date.now()}@example.com`,
        password: 'password123'
    };

    let token = '';
    let tripId = '';
    let cityId = '';
    let activityId = '';

    // 1. Signup
    console.log('\n[1] Testing Signup...');
    const signupRes = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testUser)
    });
    const signupData = await signupRes.json();
    if (signupRes.ok) {
        console.log('✅ Signup successful');
    } else {
        console.error('❌ Signup failed:', signupData);
        return;
    }

    // 2. Login
    console.log('\n[2] Testing Login...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testUser.email, password: testUser.password })
    });
    const loginData = await loginRes.json();
    if (loginRes.ok) {
        token = loginData.token;
        console.log('✅ Login successful, token received');
    } else {
        console.error('❌ Login failed:', loginData);
        return;
    }

    const authHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // 3. Create Trip
    console.log('\n[3] Testing Create Trip...');
    const tripData = {
        name: 'E2E Backend Trip',
        description: 'Testing all features',
        startDate: '2026-06-01',
        endDate: '2026-06-10'
    };
    const createTripRes = await fetch(`${BASE_URL}/trips`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(tripData)
    });
    const createTripData = await createTripRes.json();
    if (createTripRes.ok) {
        tripId = createTripData._id;
        console.log('✅ Trip created:', tripId);
    } else {
        console.error('❌ Create Trip failed:', createTripData);
        return;
    }

    // 4. Search City
    console.log('\n[4] Testing Search City...');
    const searchCityRes = await fetch(`${BASE_URL}/cities?q=Tokyo`, {
        headers: authHeaders
    });
    const cities = await searchCityRes.json();
    if (searchCityRes.ok && cities.length > 0) {
        cityId = cities[0]._id;
        console.log('✅ City found:', cities[0].name, '(' + cityId + ')');
    } else {
        console.log('⚠️ No cities found or search failed. Ensure DB is seeded.');
        // If no cities found, the rest of the flow might fail.
        // I will try to proceed but skip specific item tests if needed.
    }

    if (cityId) {
        // 5. Add Stop
        console.log('\n[5] Testing Add Stop...');
        const stopData = {
            stops: [{
                cityId: cityId,
                startDate: '2026-06-01',
                endDate: '2026-06-05',
                activities: []
            }]
        };
        const addStopRes = await fetch(`${BASE_URL}/trips/${tripId}/stops`, {
            method: 'PUT',
            headers: authHeaders,
            body: JSON.stringify(stopData)
        });
        const addStopData = await addStopRes.json();
        if (addStopRes.ok) {
            console.log('✅ Stop added to trip');
        } else {
            console.error('❌ Add Stop failed:', addStopData);
        }

        // 6. Search Activities
        console.log('\n[6] Testing Search Activities...');
        const searchActRes = await fetch(`${BASE_URL}/activities?cityId=${cityId}`, {
            headers: authHeaders
        });
        const activitiesData = await searchActRes.json();
        if (searchActRes.ok && activitiesData.length > 0) {
            activityId = activitiesData[0]._id;
            console.log('✅ Activity found:', activitiesData[0].name, '(' + activityId + ')');
        } else {
            console.log('⚠️ No activities found for city.');
        }

        if (activityId) {
            // 7. Add Activity to Stop
            console.log('\n[7] Testing Add Activity...');
            const updatedStops = {
                stops: [{
                    cityId: cityId,
                    startDate: '2026-06-01',
                    endDate: '2026-06-05',
                    activities: [{
                        activityId: activityId,
                        costOverride: 50
                    }]
                }]
            };
            const addActRes = await fetch(`${BASE_URL}/trips/${tripId}/stops`, {
                method: 'PUT',
                headers: authHeaders,
                body: JSON.stringify(updatedStops)
            });
            const addActData = await addActRes.json();
            if (addActRes.ok) {
                console.log('✅ Activity added to stop');
                console.log('Current Budget:', addActData.budget);
            } else {
                console.error('❌ Add Activity failed:', addActData);
            }
        }
    }

    // 8. Update Budget Manually
    console.log('\n[8] Testing Update Budget...');
    const budgetUpdate = {
        budget: {
            accommodation: 1000,
            transport: 500,
            meals: 300
        }
    };
    const updateBudgetRes = await fetch(`${BASE_URL}/trips/${tripId}/budget`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(budgetUpdate)
    });
    const updateBudgetData = await updateBudgetRes.json();
    if (updateBudgetRes.ok) {
        console.log('✅ Budget updated manually');
        console.log('New Total Budget:', updateBudgetData.budget.total);
    } else {
        console.error('❌ Update Budget failed:', updateBudgetData);
    }

    // 9. Copy Trip
    console.log('\n[9] Testing Copy Trip...');
    const copyRes = await fetch(`${BASE_URL}/trips/${tripId}/copy`, {
        method: 'POST',
        headers: authHeaders
    });
    const copyData = await copyRes.json();
    if (copyRes.ok) {
        console.log('✅ Trip copied successfully, new ID:', copyData._id);
    } else {
        console.error('❌ Copy Trip failed:', copyData);
    }

    // 10. Delete Trip
    console.log('\n[10] Testing Delete Trip...');
    const deleteRes = await fetch(`${BASE_URL}/trips/${tripId}`, {
        method: 'DELETE',
        headers: authHeaders
    });
    if (deleteRes.ok) {
        console.log('✅ Original trip deleted');
    } else {
        console.error('❌ Delete Trip failed');
    }

    console.log('\n--- Backend Flow Test Completed ---');
}

testFlow().catch(err => {
    console.error('Fatal Test Error:', err);
});
