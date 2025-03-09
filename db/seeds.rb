# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Clear existing tasks
Task.destroy_all

# Create sample tasks
Task.create([
  { title: "Learn Ruby on Rails", completed: true },
  { title: "Build a Task Manager app", completed: false },
  { title: "Add React frontend", completed: false },
  { title: "Deploy to production", completed: false }
])

puts "Created #{Task.count} tasks"
