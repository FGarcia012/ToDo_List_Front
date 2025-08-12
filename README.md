# Componentes de Task

Este directorio contiene los componentes relacionados con la gestión de tareas en la aplicación ToDo List.

## Componentes

### 1. TaskCard.jsx
Componente para mostrar una tarea individual con toda su información.

**Props:**
- `task` (object, required): Objeto de tarea con las siguientes propiedades:
  - `_id` o `id`: ID único de la tarea
  - `title` o `name`: Título de la tarea
  - `description`: Descripción opcional
  - `completed`: Estado de completado (boolean)
  - `priority`: Prioridad (alta, media, baja)
  - `dueDate`: Fecha límite
  - `tags`: Array de etiquetas
- `onToggle` (function, required): Función para cambiar el estado de completado
- `onDelete` (function, required): Función para eliminar la tarea
- `onEdit` (function, required): Función para editar la tarea
- `isDeleting` (boolean): Indica si la tarea se está eliminando

**Características:**
- Diseño responsive
- Animaciones suaves
- Colores diferenciados por prioridad
- Vista expandible para descripción
- Botones de acción (ver detalles, editar, eliminar)
- Soporte para etiquetas

### 2. TaskForm.jsx
Formulario para crear y editar tareas.

**Props:**
- `task` (object, optional): Tarea a editar (null para crear nueva)
- `onSubmit` (function, required): Función para enviar los datos del formulario
- `onCancel` (function, optional): Función para cancelar la operación
- `isLoading` (boolean): Estado de carga
- `mode` (string): 'create' o 'edit'

**Características:**
- Validación en tiempo real
- Campos para título, descripción, prioridad, fecha límite y etiquetas
- Formulario responsive
- Integración con el componente Input existente
- Estados de carga y error

### 3. TaskList.jsx
Contenedor principal que maneja la lista de tareas, filtros y búsqueda.

**Props:**
- `tasks` (array): Array de tareas
- `onCreateTask` (function, required): Función para crear tarea
- `onUpdateTask` (function, required): Función para actualizar tarea
- `onDeleteTask` (function, required): Función para eliminar tarea
- `onToggleTask` (function, required): Función para cambiar estado
- `isLoading`, `isCreating`, `isUpdating` (boolean): Estados de carga
- `deletingTaskId` (string): ID de la tarea que se está eliminando

**Características:**
- Filtros por estado (todas, completadas, pendientes)
- Ordenamiento (recientes, por prioridad, por fecha límite)
- Búsqueda en tiempo real
- Estadísticas de tareas
- Estados vacíos informativos
- Diseño completamente responsive

## Uso

### Ejemplo básico:
```jsx
import { TaskList } from './components/task';
import { useTask } from './shared/hooks/useTask';

function HomePage() {
  const {
    tasks,
    isFetching,
    isCreating,
    isUpdating,
    deletingTaskId,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus
  } = useTask();

  return (
    <TaskList
      tasks={tasks}
      onCreateTask={createTask}
      onUpdateTask={updateTask}
      onDeleteTask={deleteTask}
      onToggleTask={toggleTaskStatus}
      isLoading={isFetching}
      isCreating={isCreating}
      isUpdating={isUpdating}
      deletingTaskId={deletingTaskId}
    />
  );
}
```

## Estilos

Cada componente tiene su propio archivo CSS con:
- Diseño responsive
- Animaciones y transiciones
- Colores consistentes con el tema de la aplicación
- Estados hover y focus
- Breakpoints para móvil y tablet

## Dependencias

- React
- PropTypes
- CSS Modules (archivos .css)
- Componente Input.jsx (para formularios)
- Hook useTask.jsx (para lógica de estado)

## Estructura de archivos

```
src/components/task/
├── TaskCard.jsx
├── TaskCard.css
├── TaskForm.jsx
├── TaskForm.css
├── TaskList.jsx
├── TaskList.css
└── index.js
```

## Consideraciones técnicas

1. **Accesibilidad**: Los componentes incluyen atributos ARIA y navegación por teclado
2. **Performance**: Uso de useMemo para filtrado y ordenamiento
3. **Estados de carga**: Manejo adecuado de estados async
4. **Validación**: Validación en tiempo real con mensajes de error
5. **Responsive**: Diseño adaptable a diferentes tamaños de pantalla
