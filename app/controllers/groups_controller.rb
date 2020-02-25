class GroupsController < ApplicationController

def index
end

def new
  @group=Group.new
  @group.users << current_user
end

def create 
  @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
      # @groupという変数にはエラーメッセージが代入されているため、これが上書きされないようrenderによって直接ビューを表示させる必要があります。
    end
end

  def edit
    @group=Group.find(params[:id])
  end
  
  def  update
    @group = Group.find(params[:id])
      if @group.update(group_params)
        redirect_to group_messages_path(@group), notice: 'グループを更新しました'
      else
        render :edit
        # @groupという変数にはエラーメッセージが代入されているため、これが上書きされないようrenderによって直接ビューを表示させる必要があります。
      end
  end
private
    
 def group_params
  params.require(:group).permit(:name, user_ids: [])
 end

end

