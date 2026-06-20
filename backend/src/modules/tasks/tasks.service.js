const supabase = require('../../config/db');
const ApiError = require('../../utils/ApiError');

async function createTask({ title, description, due_date, priority, assignees, allowPastDue }, creatorId) {
    if (!allowPastDue && new Date(due_date) < new Date()) {
        throw new ApiError(400, 'Due date cannot be in the past');
    }

    const { data: task, error } = await supabase
        .from('Tasks')
        .insert({ title, description, due_date, priority, created_by: creatorId })
        .select()
        .single();
    if (error) throw new ApiError(400, error.message);

    const rows = assignees.map((userId) => ({ task_id: task.id, user_id: userId }));
    const { error: assignError } = await supabase.from('TaskAssignments').insert(rows);
    if (assignError) {
        await supabase.from('Tasks').delete().eq('id', task.id);
        throw new ApiError(400, 'One or more assignees do not exist');
    }

    return { ...task, assignees };
}

module.exports = { createTask };