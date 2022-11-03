package com.personal.mazerunner.model;

public class MessageDTO {
	private String userId;
	private String userName;
    private Number currentRow;
    private Number currentCol;
    private Number currentLevel;
	private Double progress;

    public MessageDTO() {}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

    public Number getCurrentRow() {
		return currentRow;
	}

	public void setCurrentRow(Number currentRow) {
		this.currentRow = currentRow;
	}

    public Number getCurrentCol() {
		return currentCol;
	}

	public void setCurrentCol(Number currentCol) {
		this.currentCol = currentCol;
	}

    public Number getCurrentLevel() {
		return currentLevel;
	}

	public void setCurrentLevel(Number currentLevel) {
		this.currentLevel = currentLevel;
	}

	public Double getProgress() {
		return progress;
	}

	public void setProgress(Double progress) {
		this.progress = progress;
	}
}
