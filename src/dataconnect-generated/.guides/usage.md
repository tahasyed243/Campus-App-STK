# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useAddNewUser, useGetCourses, useUpdateGrade, useGetAssignmentsForCourse } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useAddNewUser(addNewUserVars);

const { data, isPending, isSuccess, isError, error } = useGetCourses();

const { data, isPending, isSuccess, isError, error } = useUpdateGrade(updateGradeVars);

const { data, isPending, isSuccess, isError, error } = useGetAssignmentsForCourse(getAssignmentsForCourseVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { addNewUser, getCourses, updateGrade, getAssignmentsForCourse } from '@dataconnect/generated';


// Operation AddNewUser:  For variables, look at type AddNewUserVars in ../index.d.ts
const { data } = await AddNewUser(dataConnect, addNewUserVars);

// Operation GetCourses: 
const { data } = await GetCourses(dataConnect);

// Operation UpdateGrade:  For variables, look at type UpdateGradeVars in ../index.d.ts
const { data } = await UpdateGrade(dataConnect, updateGradeVars);

// Operation GetAssignmentsForCourse:  For variables, look at type GetAssignmentsForCourseVars in ../index.d.ts
const { data } = await GetAssignmentsForCourse(dataConnect, getAssignmentsForCourseVars);


```