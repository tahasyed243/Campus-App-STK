const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'campus-app',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const addNewUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddNewUser', inputVars);
}
addNewUserRef.operationName = 'AddNewUser';
exports.addNewUserRef = addNewUserRef;

exports.addNewUser = function addNewUser(dcOrVars, vars) {
  return executeMutation(addNewUserRef(dcOrVars, vars));
};

const getCoursesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCourses');
}
getCoursesRef.operationName = 'GetCourses';
exports.getCoursesRef = getCoursesRef;

exports.getCourses = function getCourses(dc) {
  return executeQuery(getCoursesRef(dc));
};

const updateGradeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateGrade', inputVars);
}
updateGradeRef.operationName = 'UpdateGrade';
exports.updateGradeRef = updateGradeRef;

exports.updateGrade = function updateGrade(dcOrVars, vars) {
  return executeMutation(updateGradeRef(dcOrVars, vars));
};

const getAssignmentsForCourseRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAssignmentsForCourse', inputVars);
}
getAssignmentsForCourseRef.operationName = 'GetAssignmentsForCourse';
exports.getAssignmentsForCourseRef = getAssignmentsForCourseRef;

exports.getAssignmentsForCourse = function getAssignmentsForCourse(dcOrVars, vars) {
  return executeQuery(getAssignmentsForCourseRef(dcOrVars, vars));
};
