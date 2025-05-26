import unittest
import requests
import json


class formulationTests(unittest.TestCase):
    valid_source_formulation_request_data = None 
    invalid_source_formulation_request_data = None 

    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://127.0.0.1:8080/createPrestamos"
        cls.valid_source_formulation_request_data ={ 
			"razon": "razon de prueba 1",
			"correo": "correoTest1@usm.cl",
			"nombre": "prueba1",
			"numMes": 12,
            "rut": 12333444,
			"dia" : 1,
            "mes" : 12,
            "año" : 2023,
			"ejecutivo": "soy.ejecutivo@gmail.cl",
        }
        cls.invalid_source_formulation_request_data = {
            "razon": "",
			"correo": "a",
			"nombre": "",
			"numMes": "",
            "rut": 198231982398,
			"dia" : 32,
            "mes" : 13,
            "'año'" : -2000,
			"ejecutivo": 'ejecutivo',
        }

    @classmethod
    def tearDownClass(cls):
        del cls.valid_source_formulation_request_data
        del cls.invalid_source_formulation_request_data

    def test_formulario(self):

        response= requests.post(self.base_url, json=self.valid_source_formulation_request_data)

        self.assertEqual(200,response.status_code)

    def test_formulario_invalido(self):

        response= requests.post(self.base_url, json=self.invalid_source_formulation_request_data)

        self.assertEqual(500,response.status_code)
    
    def test_formulario_get(self):
        response= requests.get(self.base_url, json=self.invalid_source_formulation_request_data)
        self.assertEqual("404",str(response.status_code))

class simulationTests(unittest.TestCase):
    valid_source_simulation_request_data = None 
    invalid_source_simulation_request_data = None 

    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://127.0.0.1:8080/CreateSims"
        cls.valid_source_simulation_request_data = {
            				
            "valorcredito": 100,
			"plazo": 12,
			"taza": 3,
            "day": 20,
            "month": 3,
            "year": 2024,
        }
        cls.invalid_source_simulation_request_data = {
            "valorcredito": 10000.0,
			"plazo": "a",
			"taza": "b",
            "dia": "ccc",
            "mes": "febrero",
            "año": 2024,
        }

    @classmethod
    def tearDownClass(cls):
        del cls.valid_source_simulation_request_data
        del cls.invalid_source_simulation_request_data

    def test_simulation(self):
        response= requests.post(self.base_url, json=self.valid_source_simulation_request_data)
        self.assertEqual(200,response.status_code)
    
    def test_simulation_invalido(self):

        response= requests.post(self.base_url, json=self.invalid_source_simulation_request_data)

        self.assertEqual(500,response.status_code)
        
if __name__ == '__main__':
    unittest.main()