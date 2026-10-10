import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea que no
 * filtra datos de cuenta (suelta y en lista) y el responsable sin nombre.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-10-10'

  // Lo único que la tarjeta necesita de su responsable, más su `id` para
  // identificarlo. Cualquier otro campo en el `assignee` hace fallar el test,
  // sin listar los que no deberían llegar.
  const CAMPOS_DEL_RESPONSABLE = ['id', 'fullName', 'initials']

  async function sesion(client: any, email = 'quien.mira@example.com') {
    await User.create({ fullName: 'Quien Mira', email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return response.body().data.token as string
  }

  async function tareaDe(fullName: string | null, email = 'responsable@example.com') {
    const responsable = await User.create({ fullName, email, password: 'secreto123' })

    return Task.create({ title: 'Preparar la demo', status: 'pending', assigneeId: responsable.id })
  }

  test('el assignee trae el nombre y las iniciales de quien la lleva', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const tarea = await tareaDe('Ada Lovelace')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('una tarea suelta no expone el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const tarea = await tareaDe('Ada Lovelace')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.sameMembers(Object.keys(assignee), CAMPOS_DEL_RESPONSABLE)
  })

  test('la lista no expone el email ni otros datos de la cuenta del responsable', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    await tareaDe('Ada Lovelace')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const tareas = response.body().data
    assert.lengthOf(tareas, 1)
    assert.sameMembers(Object.keys(tareas[0].assignee), CAMPOS_DEL_RESPONSABLE)
  })

  test('sin nombre, el nombre llega nulo y las iniciales siguen llegando', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const tarea = await tareaDe(null)

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'RE')
  })

  test('sin nombre, la lista también trae nombre nulo e iniciales', async ({ client, assert }) => {
    const token = await sesion(client)
    await tareaDe(null)

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data[0]
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'RE')
  })
})
