# ToDo List Frontend

Aplicación para gestionar tareas con funcionalidades de creación, edición, eliminación, filtrado y búsqueda.

## Características principales

- Lista de tareas con filtros y búsqueda en tiempo real
- Creación y edición de tareas con validación
- Prioridad, fecha límite y etiquetas
- Diseño responsive y accesible
- Animaciones suaves y estados de carga
- Estadísticas y estados vacíos informativos

## Componentes

- **TaskCard**: Muestra una tarea individual
- **TaskForm**: Formulario para crear/editar tareas
- **TaskList**: Contenedor principal de la lista y filtros

## Inicialización local

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd ToDo_List_Front
   ```
2. Instala dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación:
   ```sh
   npm start
   ```

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

## Dependencias

- React
- PropTypes
- CSS Modules

## Consideraciones técnicas

- Accesibilidad (atributos ARIA, navegación por teclado)
- Performance (useMemo para filtros y orden)
- Validación en tiempo real
- Diseño adaptable a móvil y tablet

---

**Autor:**  
Fredy Alexander García Sicajau
