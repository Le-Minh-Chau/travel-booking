
export async function onRequestGet(context) {
  try {
    const result = await context.env.DB
      .prepare(`
        SELECT
          id,
          name,
          destination,
          description,
          image_url,
          price,
          duration_days,
          available_slots
        FROM tours
        WHERE is_active = 1
        ORDER BY id DESC
      `)
      .all();

    return Response.json({
      success: true,
      count: result.results.length,
      data: result.results
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Không thể tải danh sách tour. Hãy kiểm tra cấu hình database."
      },
      { status: 500 }
    );
  }
}
