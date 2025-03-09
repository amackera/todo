class Api::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /api/tasks
  def index
    @tasks = Task.order(created_at: :desc)
    render json: @tasks
  end

  # GET /api/tasks/1
  def show
    render json: @task
  end

  # POST /api/tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/tasks/1
  def destroy
    @task.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :completed)
    end
end
