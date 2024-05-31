import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseChart from './ExpenseChart';
import ExportData from './ExportData';
import Login from './Login';

const App = () => {
  const [averageExpenses, setAverageExpenses] = useState([]);

  const formatExpense = (expense) => {
    if (typeof expense === "number") {
      return expense.toFixed(2);
    }
    return "N/A";
  };


  useEffect(() => {
    axios.get('http://localhost:5000/average-expense-per-category')
      .then(response => setAverageExpenses(response.data))
      .catch(error => console.error('There was an error fetching the categories!', error));
  }, []);

  return (
    <div>
      <ul><Login/></ul>
      <h1>Dépense Moyenne du Panier par Catégorie Socioprofessionnelle</h1>
      <ul>
        {averageExpenses.map(item => (
          <li key={item.categorieSocioprofessionnelle}>
            Catégorie : {item.categorieSocioprofessionnelle}, 
            Dépense Moyenne : {formatExpense(item.averageExpense)} €
          </li>
        ))}
      </ul>

      <h1>Tableau de Bord</h1>
      <ul><ExpenseChart /></ul>
      <ul><ExportData/></ul>

    </div>
  );
};

export default App;