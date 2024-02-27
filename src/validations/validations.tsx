export async function validate(schema, data) {
  try {
    await schema.validate(data, { abortEarly: false });
  } catch (error) {
    const fieldErrors = {};

    error.inner.forEach((err) => {
      fieldErrors[err.path] = err.message;
    });

    throw fieldErrors;
  }
}
