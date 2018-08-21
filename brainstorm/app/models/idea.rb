class Idea
  DB = PG.connect({:host => "localhost", :port => 5432, :dbname => 'ideaApp_development'})

  def self.all
    results = DB.exec("SELECT * FROM ideas;")
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "idea_title" => result["idea_title"],
        "idea_content" => result["idea_content"],
        "user_id" => result["user_id"].to_i
      }
    end
  end

  def self.find(id)
    results = DB.exec("SELECT * FROM ideas WHERE id=#{id};").first
    return {
        "id" => results["id"].to_i,
        "idea_title" => results["idea_title"],
        "idea_content" => results["idea_content"],
        "user_id" => results["user_id"].to_i
    }
  end

  def self.create(opts)
    results = DB.exec(
        <<-SQL
            INSERT INTO ideas (idea_title, idea_content, user_id)
            VALUES ('#{opts["idea_title"]}', '#{opts["idea_content"]}', #{opts["user_id"]} )
            RETURNING id, idea_title, idea_content, user_id;
        SQL
    ).first
    return {
        "id" => results["id"].to_i,
        "idea_title" => results["idea_title"],
        "idea_content" => results["idea_content"],
        "user_id" => results["user_id"].to_i
    }
  end

  def self.delete(id)
    results = DB.exec("DELETE FROM ideas WHERE id = #{id};")
    return{ "deleted" => true}
  end

  def self.update(id, opts)
    results = DB.exec(
        <<-SQL
            UPDATES ideas
            SET idea_title = '#{opts["idea_title"]}', idea_content = '#{opts["idea_content"]}', user_id = #{opts["user_id"]}
            WHERE id = #{id}
            RETURNING id, idea_title, idea_content, user_id;
        SQL
    ).first
    return {
        "id" => results["id"].to_i,
        "idea_title" => results["idea_title"],
        "idea_content" => results["idea_content"],
        "user_id" => results["user_id"].to_i
    }
  end
end
