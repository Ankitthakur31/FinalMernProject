import axios from "axios";

class SecureCallService {
    constructor() {
        this.url = 'http://localhost:6070';
    }

    //authenticate the user
    authUserName(username){
        let response = axios.get(`${this.url}/api/users/${username}`)
        console.log(`http ${response}`);
        
        return response;
    }
    // register users
    register(user) {
        let response = axios.post(`${this.url}/api/users/register`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    // login users
    login(user) {
        let response = axios.post(`${this.url}/api/users/authuser`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    getStudents(token) {
        let response = axios.get(`${this.url}/api/students`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    addStudents(student , token) {
        let response = axios.post(`${this.url}/api/students`,student, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    deleteStudent(id,token) {
        let response = axios.delete(`${this.url}/api/students/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    getStudentsById(id , token){
        let response = axios.get(`${this.url}/api/students/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    updateStudent(student , token) {
        let response = axios.put(`${this.url}/api/students`,student, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }
}

export default SecureCallService;