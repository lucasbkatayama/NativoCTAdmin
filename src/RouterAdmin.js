import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import AdminHome from './components/AdminHome';
import StudentManagement from './components/StudentManagement';
import StudentForm from './components/StudentForm';
import StudentEdit from './components/StudentEdit';
import TrainManagement from './components/TrainManagement';
import MarkClass from './components/MarkClass';
import ClassView from './components/ClassView';
import ClassConsult from './components/ClassConsult';
import FinancialManagement from './components/FinancialManagement';

const RouterAdmin = () => {
  return (
    <Router>
      <Scene key="root" >
        <Scene
          key="admin"
          component={AdminHome}
          initial
          title="Nativo Centro de Treinamento"
          titleStyle={{ textAlign: 'center', flex: 1, fontSize: 16 }}
        />
        <Scene key="students" component={StudentManagement} title="Gerenciar Alunos" />
        <Scene key="studentEdit" component={StudentEdit} title="Aluno" />
        <Scene key="studentCreate" component={StudentForm} title="Cadastrar Aluno" />
        <Scene key="train" component={TrainManagement} title="Marcar Treinos" />
        <Scene key="classConsult" component={ClassConsult} title="Consultar Treinos" />
        <Scene key="markClass" component={MarkClass} title="Cadastrar Aula" />
        <Scene key="classView" component={ClassView} title="Aula" />
        <Scene key="financial" component={FinancialManagement} title="Financeiro" />
      </Scene>
    </Router>
  );
};

export default RouterAdmin;
